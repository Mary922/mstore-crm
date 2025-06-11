import { Request } from "./request";
import {BASE_URL} from "../config";


export const getCountries = () => {
  let result = Request.get(`${BASE_URL}/countries/get`);
  return result;
}
