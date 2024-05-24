import { Request } from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getSeasons = () => {
  let result = Request.get(`${baseURL}/seasons/get`);
  return result;
}
