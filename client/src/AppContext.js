import React, { createContext, useCallback, useState } from "react";

export const AppContext = createContext(null);
export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const updateLoading = useCallback((value) => {
    setLoading(value);
  }, []);

  return (
    <AppContext.Provider value={{ loading, updateLoading }}>
      {children}
    </AppContext.Provider>
  );
};
