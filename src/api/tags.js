import { Request } from "./request";
import {BASE_URL} from "../config";


export const getTags = () => {
  let result = Request.get(`${BASE_URL}/tags`);
  return result;
}

export const createTags = (tagName) => {
  let result = Request.post(`${BASE_URL}/tags/create`, {tagName: tagName});
  return result;
}
export const updateTags = (tagName,tagId) => {
  let result = Request.post(`${BASE_URL}/tags/update`,{tagName: tagName, tagId: tagId});
  return result;
}
export const deleteTags = (tagId) => {
  let result = Request.post(`${BASE_URL}/tags/delete`,{tagId: tagId});
  return result;
}




