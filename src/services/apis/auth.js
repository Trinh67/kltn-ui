import axios from 'axios';
import cookies from 'js-cookies';

import { Noti } from '~/helpers';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';

const ApiUrl = apiUrl + 'auth';


const loginGoogle = async (token) => {
  const Token = axios
    .post(ApiUrl + '/login-google', token)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Token;
  const tokenRes = res.data.data.accessToken;
  return tokenRes;
};

const loginFacebook = async (token) => {
  const Token = axios
    .post(ApiUrl + '/login-facebook', token)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Token;
  const tokenRes = res.data.data.accessToken;
  return tokenRes;
};

const getCurrentUser = async () => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const User = axios
    .get(ApiUrl + '/current-user', headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const user = await User;
  const currentUser = user.data.data;
  return currentUser;
};

export default {
  loginGoogle,
  loginFacebook,
  getCurrentUser,
};
