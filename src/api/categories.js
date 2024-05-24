import { Request } from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getCategories = () => {
  let result = Request.get(`${baseURL}/categories`);
  return result;
}
export const createCategories = (categoryName) => {
  let result = Request.post(`${baseURL}/categories/create`, {categoryName: categoryName});
  return result;
}
export const updateCategories = (categoryName,categoryId) => {
  let result = Request.post(`${baseURL}/categories/update`,{categoryName: categoryName, categoryId: categoryId});
  return result;
}
export const deleteCategories = (categoryId) => {
  let result = Request.post(`${baseURL}/categories/delete`,{categoryId: categoryId});
  return result;
}
