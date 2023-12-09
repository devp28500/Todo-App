import apiService, { handleError } from "./apiService";
const TODO_ENDPOINTS = {
  GET_ALL_TODOS: "/todos",
  ADD_TODO: "/add_todo",
  DELETE_TODO: "/delete_todo",
  UPDATE_IS_COMPLETED: "/updatecompleted",
  FILTER_TODOS: "/filterTodos",
};

const todoService = {
  getTodos: async (user_id) => {
    try {
      const response = await apiService.get(
        `${TODO_ENDPOINTS.GET_ALL_TODOS}/${user_id}`
      );
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  addTodo: async (payload = {}) => {
    try {
      const response = await apiService.post(TODO_ENDPOINTS.ADD_TODO, payload);
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  deleteTodo: async (payload = {}) => {
    try {
      const response = await apiService.post(
        TODO_ENDPOINTS.DELETE_TODO,
        payload
      );
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  updateIsCompleted: async (payload) => {
    try {
      const response = await apiService.post(
        TODO_ENDPOINTS.UPDATE_IS_COMPLETED,
        payload
      );
      return response;
    } catch (e) {
      handleError(e);
    }
  },
  filterTodos: async (payload) => {
    try {
      const response = await apiService.post(
        TODO_ENDPOINTS.FILTER_TODOS,
        payload
      );
      return response;
    } catch (e) {
      handleError(e);
    }
  },
};

export default todoService;
