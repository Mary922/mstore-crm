import { Request } from "./request";
import {BASE_URL} from "../config";


export const getGenders = () => {
  let result = Request.get(`${BASE_URL}/gender/get`);
  return result;
}
export const createGenders = (genderName) => {
  let result = Request.post(`${BASE_URL}/genders/create`, {genderName: genderName});
  return result;
}
export const updateGenders = (genderName,genderId) => {
  let result = Request.post(`${BASE_URL}/brands/update`,{genderName: genderName, genderId: genderId});
  return result;
}
