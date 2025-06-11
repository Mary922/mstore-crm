import { Request } from "./request";


let baseURL = process.env.BASE_URL;


export const getCountries = () => {
  let result = Request.get(`${baseURL}/countries/get`);
  return result;
}
