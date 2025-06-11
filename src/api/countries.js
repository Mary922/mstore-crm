import { Request } from "./request";


let baseURL = 'http://127.0.0.1:3002';


export const getCountries = () => {
  let result = Request.get(`${baseURL}/countries/get`);
  return result;
}
