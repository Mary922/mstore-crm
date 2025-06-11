import { Request } from "./request";


let baseURL = process.env.BASE_URL;


export const getSizes = () => {
  let result = Request.get(`${baseURL}/sizes/get`);
  return result;
}
