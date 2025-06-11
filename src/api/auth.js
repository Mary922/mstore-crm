import { Request } from "./request";

let baseURL = process.env.BASE_URL;

export const signin = (data) => {
  let result = Request.post(`${baseURL}/crm/signin`, data);
  console.log("resss", result);
  return result;
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER & TOKEN from localstorage", user);
  if (user && user.accessToken) {
    return {

      "x-access-token": user.accessToken
    };
  } else {
    console.log("No access token or user");
    return {};
  }
};

export const fileHeader = () => {

    return {
      "Content-Type": "multipart/form-data"
    };
};
