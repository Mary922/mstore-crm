import { Request } from "./request";


let baseURL = process.env.BASE_URL;


export const getColors = () => {
  let result = Request.get(`${baseURL}/colors`);
  return result;
}

export const createColors = (colorName,colorRGB) => {
  let result = Request.post(`${baseURL}/colors/create`, {colorName: colorName,colorRGB: colorRGB});
  return result;
}
export const updateColors = (colorName,colorRGB,colorId) => {
  let result = Request.post(`${baseURL}/colors/update`,{colorName: colorName, colorRGB: colorRGB, colorId: colorId});
  return result;
}
export const deleteColors = (colorId) => {
  let result = Request.post(`${baseURL}/colors/delete`,{colorId: colorId});
  return result;
}



