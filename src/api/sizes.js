import { Request } from "./request";


let baseURL = 'http://127.0.0.1:3002';


export const getSizes = () => {
  let result = Request.get(`${baseURL}/sizes/get`);
  return result;
}
