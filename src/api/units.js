import { Request } from "./request";


let baseURL = process.env.BASE_URL;

export const getUnits = () => {
  let result = Request.get(`${baseURL}/units/get`);
  return result;
}
export const createUnits = (unitName) => {
  let result = Request.post(`${baseURL}/units/create`, {unitName: unitName});
  return result;
}
export const updateUnits = (unitName,unitId) => {
  let result = Request.post(`${baseURL}/units/update`,{unitName: unitName, unitId: unitId});
  return result;
}
