import { Request } from "./request";
import {BASE_URL} from "../config";


export const getOrders = () => {
  let result = Request.get(`${BASE_URL}/orders/crm`);
  return result;
}


export const getRegions= () => {
  let result = Request.get(`${BASE_URL}/regions`);
  return result;
}
