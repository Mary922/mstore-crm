import { Request } from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getBrands = () => {
  let result = Request.get(`${baseURL}/brands/get`);
  return result;
}
export const createBrands = (brandName) => {
  let result = Request.post(`${baseURL}/brands/create`, {brandName: brandName});
  return result;
}
export const updateBrands = (brandName,brandId) => {
  let result = Request.post(`${baseURL}/brands/update`,{brandName: brandName, brandId: brandId});
  return result;
}
