import React, { createContext } from "react";

export const TodoContext = createContext(null);
export const TodoContextProvider = ({ children }) => {
  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
};
