import { Request } from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getCategories = () => {
  let result = Request.get(`${baseURL}/categories`);
  return result;
}
export const createCategories = (categoryName,gender,parentId) => {
  let result = Request.post(`${baseURL}/categories/create`, {categoryName: categoryName,gender: gender,parentId:parentId});
  return result;
}
export const updateCategories = (categoryName,categoryId,gender,parentId) => {
  let result = Request.post(`${baseURL}/categories/update`,{categoryName: categoryName, categoryId: categoryId, gender: gender,parentId:parentId});
  return result;
}
export const deleteCategories = (categoryId) => {
  let result = Request.post(`${baseURL}/categories/delete`,{categoryId: categoryId});
  return result;
}

export const getParentsCategories = () => {
  let result = Request.get(`${baseURL}/categories/parents/get`);
  return result;
}

