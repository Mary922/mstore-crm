import { Request } from "./request";
import {BASE_URL} from "../config";


export const getSizes = () => {
  let result = Request.get(`${BASE_URL}/sizes/get`);
  return result;
}
