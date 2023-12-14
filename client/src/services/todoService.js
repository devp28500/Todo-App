import apiService, { handleError } from "./apiService";
const TODO_ENDPOINTS = {
  GET_ALL_TODOS: "/todos/find/todo",
  ADD_TODO: "/todos/add/todo",
  DELETE_TODO: "/todos/delete/todo",
  UPDATE_IS_COMPLETED: "/todos/update/completed",
  FILTER_TODOS: "todos/filter/todos",
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
