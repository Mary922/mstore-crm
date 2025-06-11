import { Request } from "./request";
import {BASE_URL} from "../config";


export const getSeasons = () => {
  let result = Request.get(`${BASE_URL}/seasons/get`);
  return result;
}
