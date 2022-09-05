import cookies from "js-cookies";
import { Col, Image, Row } from 'antd';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import FacebookLogin from 'react-facebook-login';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { t } from 'i18next';
import images from '~/assets/images';
import styles from './Login.module.scss';
import { authService } from '~/services';
import { browserHistory } from '~/helpers';

const cx = classNames.bind(styles);

const REACT_APP_GOOGLE_ID = '162098319608-buveos2g614scesufvvqrqqke3nml452.apps.googleusercontent.com';

var currentUser = {}

function Login() {
  const responseGoogle = async (response) => {
    const result = await authService.loginGoogle({'tokenId': response.credential});
    cookies.removeItem('token')
    cookies.setItem('token', result, { path: '/' });
    const currentUser = await authService.getCurrentUser()
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    browserHistory.push("/");
    window.location.reload()
  };

  const componentClicked = () => {};

  const responseFacebook = async (response) => {
    const result = await authService.loginFacebook({'tokenId': response.accessToken});
    cookies.removeItem('token')
    cookies.setItem('token', result, { path: '/' });
    const currentUser = await authService.getCurrentUser()
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
            icon={<FontAwesomeIcon icon={faFacebookF} style={{'paddingRight': '20px'}} />}
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
