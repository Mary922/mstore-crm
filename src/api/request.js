import axios from "axios";

export class Request {

  static async get(url) {
    try {
      const response = await axios.get(url);
      const result = response.data;
      console.log('RESULT', result);

      if (!response) {
        throw new  Error('Server error')
      }
      return result;

    } catch (error) {
      console.error('error')
    }

  }

  static async post(url,body) {
    console.log('URL','BODY',url,body)
    try {
      const response = await axios.post(url,body);
      const result = response.data;
      console.log('RESULT', result);

      if (!response) {
        throw new  Error('Server error')
      }
      return result;

    } catch (error) {
      console.error('error')
    }

  }
}
