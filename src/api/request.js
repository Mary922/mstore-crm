import axios from "axios";
import { authHeader } from "./auth";


const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    ...authHeader(),
  };
};

export class Request {

  static async get(url) {
    try {
      const response = await axios.get(url, {
        headers: getHeaders()
      });
      const result = response.data;

      if (!response) {
        throw new Error("Server error");
      }

      return result;

    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.hash = '#/login';
        window.location.reload();
      }
    }

  }

  static async post(url, body, headers) {
    // console.log("URL", "BODY", url, body);
    let newHeaders = getHeaders();
    if (headers){
      newHeaders = {...newHeaders, ...headers};
    }
    try {
      const response = await axios.post(url, body,{
        headers: newHeaders
      });
      const result = response.data;

      if (!response) {
        throw new Error("Server error");
      }
      if (response.status === 401) {
        window.location.hash = '#/login';
        window.location.reload();
      }
      return result;

    } catch (error) {
      console.error("error");
    }

  }
}
