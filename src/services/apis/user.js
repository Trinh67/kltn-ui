import axios from 'axios';
import { Noti } from '~/helpers';
import cookies from 'js-cookies';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';

const ApiUrl = apiUrl + 'user';

/**
 * Lấy danh sách người dùng
 * @returns Danh sách người dùng
 */
const getListUsers = async () => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const Users = axios
    .get(ApiUrl + '/list-user', headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Users;
  const users = res.data.data.users;
  return users;
};

export default {
    getListUsers,
};
