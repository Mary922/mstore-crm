import { Request } from "./request";
import {BASE_URL} from "../config";


export const getProducts = () => {
  let result = Request.get(`${BASE_URL}/products`);
  return result;
}
export const getProduct = (productId) => {
  let result = Request.get(`${BASE_URL}/product/?productId=${productId}`);
  return result;
}
export const updateProduct = (data) => {
  let result = Request.post(`${BASE_URL}/product/update`,data);
  console.log('DATA for updating', data);
  return result;
}
export const createProduct = (data) => {
  let result = Request.post(`${BASE_URL}/product/new/create`,data);
  console.log('DATA for creating', data);
  return result;
}

