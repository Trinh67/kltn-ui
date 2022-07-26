import axios from 'axios';
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

export default {
  searchFiles,
};
