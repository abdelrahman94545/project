// import { axios } from "axios";
import jwtAxios from "axios";


export const Instance  = jwtAxios.create({
    // baseURL: 'http://192.168.1.151:8000/api',
    baseURL: 'http://62.171.166.157:9497/',
    // baseURL: 'http://10.0.0.9:8000/',
    // baseURL: 'http://dynamiceg.ddns.net:35/',
    // baseURL: 'http://10.0.0.9:8000/api',
    // headers: {'X-Custom-Header': 'foobar'}
  }); 

  // export default Instance;