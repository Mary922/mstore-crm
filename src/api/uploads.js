import { Request } from "./request";
import {BASE_URL} from "../config";


export const uploadImage = (files) => {

  // formData.append("files", files);

  if (files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const result = Request.post(`${BASE_URL}/upload_files`, formData, { "content-type": "multipart/form-data" });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};


export const uploadImageStatic = (files, type, field) => {

  // formData.append("files", files);


  if (files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("type", type);
    formData.append("field", field);

    try {
      const result = Request.post(`${BASE_URL}/upload_files/static`, formData, { "content-type": "multipart/form-data" });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
