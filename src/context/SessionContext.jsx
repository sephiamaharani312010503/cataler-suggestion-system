import { useSession } from "next-auth/react";
import React, { createContext, useContext } from "react";

const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const { data: session } = useSession();

  const contextValue = {
    userId: session?.user.id,
    userName: session?.user.name,
    userNik: session?.user.nik,
    userJabatan: session?.user.jabatan,
    userDepartemen: session?.user.departemen,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
