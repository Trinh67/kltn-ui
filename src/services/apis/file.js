import axios from 'axios';
import cookies from 'js-cookies';

import { Noti } from '~/helpers';
import { t } from 'i18next';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';

const ApiUrl = apiUrl + 'file';

/**
 * Upload file
 * @returns File name
 */
const uploadFile = async (FileData) => {
  console.log(FileData);
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const File = axios
    .post(ApiUrl + '/upload-file', FileData, headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await File;
  return res.data;
};

/**
 * Lấy danh sách file
 * @returns Danh sách file
 */
const getListFiles = async () => {
  const Files = axios
    .get(ApiUrl + '/list-file')
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
 * Lọc danh sách file
 * @returns Danh sách file
 */
const filterFiles = async (type) => {
  const config = {
    headers: { Authorization: `Bearer ${cookies.getItem('token')}` },
    params: {
      type: type,
    },
  };
  const Files = axios
    .get(ApiUrl + '/filter-file', config)
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
 * Upload file
 * @returns File name
 */
const updateStatusFile = async (FileData) => {
  console.log(FileData);
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const File = axios
    .post(ApiUrl + '/update-status-file', FileData, headers)
    .then((response) => {
      Noti.SuccessMessage(t('Messages.UpdateStatusDocSuccess'))
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
  uploadFile,
  getListFiles,
  filterFiles,
  updateStatusFile,
};
