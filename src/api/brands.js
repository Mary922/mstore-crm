import { Request } from "./request";
import {BASE_URL} from "../config";

export const getBrands = () => {
  let result = Request.get(`${BASE_URL}/brands/get`);
  return result;
}
export const createBrands = (brandName) => {
  let result = Request.post(`${BASE_URL}/brands/create`, {brandName: brandName});
  return result;
}
export const updateBrands = (brandName,brandId) => {
  let result = Request.post(`${BASE_URL}/brands/update`,{brandName: brandName, brandId: brandId});
  return result;
}
