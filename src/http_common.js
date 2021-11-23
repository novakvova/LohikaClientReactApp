import axios from "axios";

export default axios.create({
  baseURL: "https://vovalohika.tk/",
  headers: {
    "Content-type": "application/json"
  }
});