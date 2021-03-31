import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://burgerbuilder-6a22a-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
