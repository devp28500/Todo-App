import apiService, { handleError } from "./apiService";
const USER_ENDPOINTS = {
  GET_USERS: "/users/get/users",
  ADD_USER: "/users/add/user",
  LOGIN: "/users/login",
  RESET_PASSWORD: "/users/reset/password",
};
const userServices = {
  getUsers: async () => {
    try {
      const response = await apiService.get(USER_ENDPOINTS.GET_USERS);
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  addUser: async (payload = {}) => {
    try {
      const response = await apiService.post(USER_ENDPOINTS.ADD_USER, payload);
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  login: async (paylaod = {}) => {
    try {
      const response = await apiService.post(USER_ENDPOINTS.LOGIN, paylaod);
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  resetPassword: async (payload = {}) => {
    try {
      const response = await apiService.put(
        USER_ENDPOINTS.RESET_PASSWORD,
        payload
      );
      return response;
    } catch (e) {
      handleError(e);
    }
  },
};

export default userServices;
