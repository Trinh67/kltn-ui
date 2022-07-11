import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import FacebookLogin from 'react-facebook-login';
import jwt_decode from 'jwt-decode'
import { Col, Row } from 'antd';
import styles from './Login.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons' 

const cx = classNames.bind(styles);

const REACT_APP_GOOGLE_ID = '162098319608-buveos2g614scesufvvqrqqke3nml452.apps.googleusercontent.com';

var currentUser = {}

function Login() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  const responseGoogle = (response) => {
    console.log(response);
    currentUser = jwt_decode(response.credential);
    console.log(currentUser);
    history.push("/")
  };

  const componentClicked = (data) => {
    console.log(data);
  };

  const responseFacebook = (response) => {
    console.log(response);
    currentUser = response;
    history.push("/")
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
        Đăng nhập
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
            textButton = "Đăng nhập bằng Facebook"
          />
        </Row>
      </Col>
      <Col flex={5} ></Col>
    </Row>
  );
}

export default Login;

export const StoreContext = React.createContext(currentUser);
