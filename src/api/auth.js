import { Request } from "./request";
import {BASE_URL} from "../config";


export const signin = (data) => {
  let result = Request.post(`${BASE_URL}/crm/signin`, data);
  console.log("resss", result);
  return result;
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("USER & TOKEN from localstorage", user);
  if (user && user.accessToken) {
    return {

      "x-access-token": user.accessToken
    };
  } else {
    // console.log("No access token or user");
    return {};
  }
};

export const fileHeader = () => {

    return {
      "Content-Type": "multipart/form-data"
    };
};


export const checkAuthorzation = (data) => {
  let result = Request.post(`${BASE_URL}/auth/check`, data);
  return result;
};
