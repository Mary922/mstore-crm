import { Request } from "./request";
import {BASE_URL} from "../config";


export const getColors = () => {
  let result = Request.get(`${BASE_URL}/colors`);
  return result;
}

export const createColors = (colorName,colorRGB) => {
  let result = Request.post(`${BASE_URL}/colors/create`, {colorName: colorName,colorRGB: colorRGB});
  return result;
}
export const updateColors = (colorName,colorRGB,colorId) => {
  let result = Request.post(`${BASE_URL}/colors/update`,{colorName: colorName, colorRGB: colorRGB, colorId: colorId});
  return result;
}
export const deleteColors = (colorId) => {
  let result = Request.post(`${BASE_URL}/colors/delete`,{colorId: colorId});
  return result;
}



