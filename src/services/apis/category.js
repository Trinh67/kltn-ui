import axios from 'axios';
import { Noti } from '~/helpers';

const apiUrl = 'http://127.0.0.1:8000/api/v1/';

const ApiUrl = apiUrl + 'category';

/**
 * Lấy danh sách danh mục
 * @returns Danh sách danh mục
 */
const getListCategories = async () => {
  const Categories = axios
    .get(ApiUrl + '/list-category')
    .then((response) => {
      return response;
    })
    .catch((err) => {
      Noti.ErrorMessage(err.response.data.message);
      return err.response;
    });
  const res = await Categories;
  const categories = res.data.data.categories;
  return categories;
};

export default {
    getListCategories,
};
