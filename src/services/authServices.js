import axios from "axios";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
console.log(serverAddress);
const loginServices = {
  register: (data) => axios.post(`${serverAddress}/user/signup`, data),
  login: (data) => axios.post(`${serverAddress}/user/login`, data),
};
export default loginServices;
