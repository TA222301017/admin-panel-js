import http from "../../utils/httpClient";

export const fetchLogin = async (data) => {
  try {
    return await http.post("/login", data);
  } catch (err) {
    if (err.response) {
      return response;
    } else {
      console.log(err);
      return {};
    }
  }
};
