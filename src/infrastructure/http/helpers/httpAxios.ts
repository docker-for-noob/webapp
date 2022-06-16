import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers:headers,
});
