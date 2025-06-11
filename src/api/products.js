import { Request } from "./request";


let baseURL = process.env.BASE_URL;

export const getProducts = () => {
  let result = Request.get(`${baseURL}/products`);
  return result;
}
export const getProduct = (productId) => {
  let result = Request.get(`${baseURL}/product/?productId=${productId}`);
  return result;
}
export const updateProduct = (data) => {
  let result = Request.post(`${baseURL}/product/update`,data);
  console.log('DATA for updating', data);
  return result;
}
export const createProduct = (data) => {
  let result = Request.post(`${baseURL}/product/new/create`,data);
  console.log('DATA for creating', data);
  return result;
}

