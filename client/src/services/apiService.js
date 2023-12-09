import axios from "axios";
import { displaySnackbar } from "../components/snackbar/displaySnackbar";
const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        console.log("Bad Request");
      } else if (status === 401) {
        console.log("User is not authenticated");
        //code to logout user or redirect to login screen
      } else if (status === 403) {
        console.log("User access denied");
      } else if (status === 404) {
        console.log("Resource not found");
      } else if (status >= 500) {
        console.log("Server is unavailable");
      }
    }
    console.log(error);
    return Promise.reject(error);
  }
);
const apiService = {
  get: async (url, config) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  post: async (url, data, config) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  delete: async (url, config) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  put: async (url, data, config) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

export const handleError = (err) => {
  return displaySnackbar({
    message:
      err.response?.data?.result?.message || err.response?.data?.error?.message,
    type: "error",
  });
};

export default apiService;
