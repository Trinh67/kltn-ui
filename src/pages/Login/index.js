import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import jwt_decode from 'jwt-decode'

const REACT_APP_GOOGLE_ID = '162098319608-buveos2g614scesufvvqrqqke3nml452.apps.googleusercontent.com';

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
    var userObj = jwt_decode(response.credential);
    console.log(userObj)
  };

  const componentClicked = (data) => {
    console.log(data);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: REACT_APP_GOOGLE_ID,
      callback: responseGoogle
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )
  }, []);

  return (
    <>
      <div id="signInDiv"></div>
      <FacebookLogin
        appId="292398773067523"
        autoLoad={false}
        fields="name,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </>
  );
}

export default Login;
