import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";

const AllStateContext = createContext();

export const AllStateProvider = ({ children }) => {
  const { data: session } = useSession();

  const contextValue = {
    userId: session?.user.id,
    userName: session?.user.name,
    userNik: session?.user.nik,
    userJabatan: session?.user.jabatan,
    userDepartemen: session?.user.departemen,
  };

  return (
    <AllStateContext.Provider value={contextValue}>
      {children}
    </AllStateContext.Provider>
  );
};

export const useAllStateContext = () => {
  const context = useContext(AllStateContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
