import { Request } from "./request";
import {BASE_URL} from "../config";


export const getClients = () => {
  let result = Request.get(`${BASE_URL}/clients`);
  return result;
}
