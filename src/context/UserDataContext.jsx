import axios from "axios";
import { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import { useSessionContext } from "./SessionContext";

const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const { userNik } = useSessionContext();
  const {
    docId,
    setDocId,
    setAllUserData,
    setUserPoint,
    addedUserDepartemen,
    addedUserJabatan,
    addedUserName,
    addedUserNik,
    addedUserRole,
    setIsModalAddUserOpen,
    setEditName,
    setEditNik,
    setEditJabatan,
    setEditDepartemen,
    setEditRole,
    editName,
    editNik,
    editJabatan,
    editDepartemen,
    editRole,
    setIsModalUserDetailOpen,
    isModalUserDeleteOpen,
    setIsModalUserDeleteOpen,
  } = useAllStateContext();

  const handleDeleteUserModal = () => {
    setIsModalUserDeleteOpen(!isModalUserDeleteOpen);
  };

  const addUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/usersData/addUser", {
        name: addedUserName,
        nik: addedUserNik,
        departemen: addedUserDepartemen,
        jabatan: addedUserJabatan,
        role: addedUserRole,
      });
      setIsModalAddUserOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserData = async () => {
    try {
      const response = await axios.get("/api/usersData/getAllUsers");
      setAllUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByNik = async () => {
    try {
      if (userNik) {
        const response = await axios.get(
          `/api/usersData/getUserByNik?userNik=${userNik}`
        );
        setUserPoint(response.data.point);
      }
    } catch (error) {
      console.error("Error fetching all suggestions:", error);
    }
  };

  const getUserById = async (itemId) => {
    try {
      const response = await axios.get(
        `/api/usersData/getUserById?docId=${itemId}`
      );
      setDocId(itemId);
      setEditName(response.data.name);
      setEditNik(response.data.nik);
      setEditJabatan(response.data.jabatan);
      setEditDepartemen(response.data.departemen);
      setEditRole(response.data.role);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.patch("/api/usersData/updateUser", {
        docId: docId,
        name: editName,
        nik: editNik,
        departemen: editDepartemen,
        jabatan: editJabatan,
        role: editRole,
      });
      getAllUserData();
      setIsModalUserDetailOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/usersData/deleteUser?docId=${docId}`);
      getAllUserData();
      setIsModalUserDeleteOpen(false);
      setIsModalUserDetailOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    getAllUserData,
    getUserByNik,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    handleDeleteUserModal,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
