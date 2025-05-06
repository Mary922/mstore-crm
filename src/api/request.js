import axios from "axios";
import { authHeader, fileHeader } from "./auth";


const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    ...authHeader(),
  };
};

export class Request {

  static async get(url) {
    console.log("URL", url);
    try {
      const response = await axios.get(url, {
        headers: getHeaders()
      });
      const result = response.data;
      console.log("RESULT", result);


      if (!response) {
        throw new Error("Server error");
      }

      console.log(response);


      return result;

    } catch (error) {
      if (error.response.status === 401) {
        console.log("401 error");
        window.location.hash = '#/login';
        window.location.reload();
      }
    }

  }

  static async post(url, body, headers) {
    console.log("URL", "BODY", url, body);
    let newHeaders = getHeaders();
    if (headers){
      newHeaders = {...newHeaders, ...headers};
    }
    try {
      const response = await axios.post(url, body,{
        headers: newHeaders
      });
      const result = response.data;
      console.log("RESULT", result);

      if (!response) {
        throw new Error("Server error");
      }
      console.log(response.status);
      if (response.status === 401) {
        console.log("401 error");
        window.location.hash = '#/login';
        window.location.reload();
      }
      return result;

    } catch (error) {
      console.error("error");
    }

  }
}
