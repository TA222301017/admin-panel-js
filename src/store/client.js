import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token !== "" && token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

http.interceptors.response.use(
  (response) => {
    let { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
    }

    return response;
  },
  (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default http;
