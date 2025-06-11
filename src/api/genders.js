import { Request } from "./request";


let baseURL = process.env.BASE_URL;

export const getGenders = () => {
  let result = Request.get(`${baseURL}/gender/get`);
  return result;
}
export const createGenders = (genderName) => {
  let result = Request.post(`${baseURL}/genders/create`, {genderName: genderName});
  return result;
}
export const updateGenders = (genderName,genderId) => {
  let result = Request.post(`${baseURL}/brands/update`,{genderName: genderName, genderId: genderId});
  return result;
}
