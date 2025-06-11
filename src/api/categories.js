import { Request } from "./request";
import {BASE_URL} from "../config";


export const getCategories = () => {
  let result = Request.get(`${BASE_URL}/categories`);
  return result;
}
export const createCategories = (categoryName,gender,parentId) => {
  let result = Request.post(`${BASE_URL}/categories/create`, {categoryName: categoryName,gender: gender,parentId:parentId});
  return result;
}
export const updateCategories = (categoryName,categoryId,gender,parentId) => {
  let result = Request.post(`${BASE_URL}/categories/update`,{categoryName: categoryName, categoryId: categoryId, gender: gender,parentId:parentId});
  return result;
}
export const deleteCategories = (categoryId) => {
  let result = Request.post(`${BASE_URL}/categories/delete`,{categoryId: categoryId});
  return result;
}

export const getParentsCategories = () => {
  let result = Request.get(`${BASE_URL}/categories/parents/get`);
  return result;
}

