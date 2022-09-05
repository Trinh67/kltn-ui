import axios from 'axios';
import cookies from "js-cookies";

import { t } from 'i18next';
import { Noti } from '~/helpers';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';

const ApiUrl = apiUrl + 'elastic-file';

/**
 * Tìm kiếm file
 * @returns Danh sách file
 */
const searchFiles = async (Parameters) => {
  const Files = axios
    .post(ApiUrl + '/search', Parameters)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Files;
  return res.data;
};

/**
 * Create file
 * @returns File Id
 */
 const createFile = async (FormData) => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const File = axios
    .post(ApiUrl + '/', FormData, headers)
    .then((response) => {
      Noti.SuccessMessage(t('Messages.CreateDocSuccess'))
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await File;
  return res.data;
};

export default {
  searchFiles,
  createFile
};
