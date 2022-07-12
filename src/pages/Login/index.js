import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import FacebookLogin from 'react-facebook-login';
import jwt_decode from 'jwt-decode'
import { Col, Image, Row } from 'antd';
import styles from './Login.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { browserHistory } from '~/helpers';
import images from '~/assets/images';
import { t } from 'i18next';

const cx = classNames.bind(styles);

const REACT_APP_GOOGLE_ID = '162098319608-buveos2g614scesufvvqrqqke3nml452.apps.googleusercontent.com';

var currentUser = {}

function Login() {
  const responseGoogle = (response) => {
    var user = jwt_decode(response.credential);
    currentUser = {
      'name': user.name,
      'imageUrl': user.picture,
      'email': user.email,
      'user_id': user.sub,
      'source': 'google'
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    browserHistory.push("/");
    window.location.reload()
  };

  const componentClicked = () => {};

  const responseFacebook = (response) => {
    var user = response;
    currentUser = {
      'name': user.name,
      'imageUrl': user.picture.data.url,
      'email': user.email,
      'user_id': user.id,
      'source': 'facebook'
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    browserHistory.push("/");
    window.location.reload()
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: REACT_APP_GOOGLE_ID,
      callback: responseGoogle
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", width: "300px", text: "Sign In with Google"}
    )
  }, []);

  return (
    <Row>
      <Col flex={5} ></Col>
      <Col className={cx('loginForm')} flex={1}>
        <Row className={cx('logo')}>
          <Image src={images.fit} alt="Logo FIT" width='180px'></Image>
        </Row>
        {t('LogIn')}
        <Row lg={6} md={6} sm={6} xs={6} className={cx('buttonLogin')}>
          <div id="signInDiv"></div>
        </Row>
        <Row lg={6} md={6} sm={6} xs={6} className={cx('buttonLogin')}>
          <FacebookLogin
            appId="292398773067523"
            autoLoad={false}
            fields="name,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            cssClass={cx('btnFacebook')}
            icon={<FontAwesomeIcon icon={faFacebookF} style={{'padding-right': '20px'}} />}
            textButton = {t('LogInFace')}
          />
        </Row>
      </Col>
      <Col flex={5} ></Col>
    </Row>
  );
}

export default Login;

export const StoreContext = React.createContext(currentUser);
