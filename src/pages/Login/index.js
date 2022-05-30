import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

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
  };

  const componentClicked = (data) => {
    console.log(data);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <>
      {showloginButton ? (
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_ID}
          buttonText="Log in with Google"
          onSuccess={onLoginSuccess}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          plugin_name="kltn-client"
        />
      ) : null}
      {showlogoutButton ? (
        <GoogleLogout clientId={REACT_APP_GOOGLE_ID} buttonText="Sign Out" onLogoutSuccess={onSignoutSuccess} />
      ) : null}
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
