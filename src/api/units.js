import { Request } from "./request";
import {BASE_URL} from "../config";


export const getUnits = () => {
  let result = Request.get(`${BASE_URL}/units/get`);
  return result;
}
export const createUnits = (unitName) => {
  let result = Request.post(`${BASE_URL}/units/create`, {unitName: unitName});
  return result;
}
export const updateUnits = (unitName,unitId) => {
  let result = Request.post(`${BASE_URL}/units/update`,{unitName: unitName, unitId: unitId});
  return result;
}
