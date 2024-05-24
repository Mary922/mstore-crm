import { Request } from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getTags = () => {
  let result = Request.get(`${baseURL}/tags`);
  return result;
}

export const createTags = (tagName) => {
  let result = Request.post(`${baseURL}/tags/create`, {tagName: tagName});
  return result;
}
export const updateTags = (tagName,tagId) => {
  let result = Request.post(`${baseURL}/tags/update`,{tagName: tagName, tagId: tagId});
  return result;
}
export const deleteTags = (tagId) => {
  let result = Request.post(`${baseURL}/tags/delete`,{tagId: tagId});
  return result;
}




