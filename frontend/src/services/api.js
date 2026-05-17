import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-agriculture-8u1g.onrender.com/",
});

export default API;