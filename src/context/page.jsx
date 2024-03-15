import React, { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isAuthenticated, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <Context.Provider value={{ isAuthenticated, isLoading, setAuth, setLoading }}>
            {children}
            <Toaster/>
        </Context.Provider>
    );
};

const setAuthenticated = () => {
    const { setAuth } = useContext(Context);
    setAuth(true);
};

const useData = () => {
    const context = useContext(Context);
  
    if (!context) {
      throw new Error('useYourContext must be used within a YourContextProvider');
    }
  
    return context;
  };

export { Context, useData , ContextProvider, setAuthenticated };
