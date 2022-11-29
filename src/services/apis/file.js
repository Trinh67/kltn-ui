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
 * Lấy danh sách file theo category
 * @returns Danh sách file
 */
 const getListCategoryFiles = async (id) => {
  const Files = axios
    .get(ApiUrl + '/category?id=' + id)
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
 * Updatefile
 * @returns File id
 */
const updateStatusFile = async (FileData) => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const File = axios
    .post(ApiUrl + '/update-status-file', FileData, headers)
    .then((response) => {
      Noti.SuccessMessage(t('Messages.UpdateStatusDocSuccess'));
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
 * Actionfile
 * @returns File id
 */
const actionFile = async (FileData) => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const File = axios
    .post(ApiUrl + '/action-file', FileData, headers)
    .then((response) => {
      if (FileData.type === 0){
        Noti.SuccessMessage(t('Messages.RemoveLikeSuccess'));
      } else if (FileData.type === 1){
        Noti.SuccessMessage(t('Messages.LikeDocSuccess'));
      } else if (FileData.type === 2){
        Noti.SuccessMessage(t('Messages.RemoveShareSuccess'));
      } else if (FileData.type === 3){
        Noti.SuccessMessage(t('Messages.ShareDocSuccess'));
      }
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
 * Updatefile
 * @returns File id
 */
const getListSharedEmail = async (requestBody) => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const Emails = axios
    .post(ApiUrl + '/shared-list', requestBody, headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Emails;
  return res.data.data.emails;
};

/**
 * Get statistic file
 * @returns List file
 */
const getStatisticFile = async () => {
  const headers = { headers: { Authorization: `Bearer ${cookies.getItem('token')}` } };
  const Files = axios
    .get(ApiUrl + '/statistic', headers)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Files;
  return res.data.data.files;
};

export default {
  uploadFile,
  getListFiles,
  filterFiles,
  updateStatusFile,
  actionFile,
  getListSharedEmail,
  getStatisticFile,
  getListCategoryFiles
};
