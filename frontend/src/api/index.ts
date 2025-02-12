import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"
// axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.validateStatus = code => code < 500;

export * from "./repositories"
export * from "./files"
