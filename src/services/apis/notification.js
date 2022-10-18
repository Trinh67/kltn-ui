import axios from 'axios';
import { Noti } from '~/helpers';
import cookies from 'js-cookies';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';

const ApiUrl = apiUrl + 'notification';

/**
 * Lấy danh sách thông báo
 * @returns Danh sách thông báo
 */
const getListNotifications = async () => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const Notifications = axios
    .get(ApiUrl, headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Notifications;
  const notifications = res.data.data.notifications;
  return notifications;
};

export default {
  getListNotifications,
};
