import { Request } from "./request";


let baseURL = process.env.BASE_URL;


export const getSeasons = () => {
  let result = Request.get(`${baseURL}/seasons/get`);
  return result;
}
