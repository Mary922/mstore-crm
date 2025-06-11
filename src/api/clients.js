import { Request } from "./request";


let baseURL = process.env.BASE_URL;

export const getClients = () => {
  let result = Request.get(`${baseURL}/clients`);
  return result;
}
