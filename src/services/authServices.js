import axios from "axios";

const serverAddress = process.env.REACT_APP_AUTOLABS_SERVER_ADDRESS;

const loginServices = {
  register: (data) => axios.post(`${serverAddress}/auth/signup`, data),
  login: (data) => axios.post(`${serverAddress}/auth/login`, data),
};
export default loginServices;
