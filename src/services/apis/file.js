import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api/v1/"

const ApiUrl = apiUrl + "file";

/**
 * Lấy danh sách file
 * @returns Danh sách file
 */
const getFiles = async () => {
  const Files = axios.get(ApiUrl + '/list-file').then((response) => {
    return response;
  })
  .catch((err) => {
    return err.response;
  });
  const res = await Files;
  return res.data;
};

export default {
  getFiles
};