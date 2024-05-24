import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const signin = (data) => {
  let result = Request.post(`${baseURL}/crm/signin`, data);
  return result;
}
export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('USER & TOKEN from localstorage',user);
  if (user && user.accessToken) {
    return {

      'x-access-token': user.accessToken
    }
  } else {
    console.log('No access token or user')
    return {}
  }
}
