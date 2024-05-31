import React, { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import { useSessionContext } from "./SessionContext";
import axios from "axios";
import { format } from "date-fns";

const SuggestionDataContext = createContext();

export const SuggestionDataContextProvider = ({ children }) => {
  const { userNik, userName } = useSessionContext();
  const {
    title,
    currentCondition,
    suggestion,
    status,
    setStatus,
    category,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    setCategory,
    setAllSuggestion,
    setAllUserSuggestion,
    setIsModalSuggestionDetailOpen,
    selectedCategory,
    selectedTitle,
    selectedCurrentCondition,
    selectedSuggestion,
    setSelectedCategory,
    setSelectedTitle,
    setSelectedCurrentCondition,
    setSelectedSuggestion,
    setSelectedDate,
    docId,
    setDocId,
    isModalSuggestionDeleteOpen,
    setIsModalSuggestionDeleteOpen,
    isModalAddSuggestionOpen,
    setIsModalAddSuggestionOpen,
    setIsAddBtnLoading,
    setIsEditBtnLoading,
    setIsDeleteBtnLoading,
    setSelectedName,
    setSelectedNik,
    setIsModalAdminSuggestionDetailOpen,
    selectedNik,
    isModalClaimRewardOpen,
    setIsModalClaimRewardOpen,
    date,
  } = useAllStateContext();

  const handleRadioChange = (value) => {
    setCategory(value);
  };

  const handleEditRadioChange = (value) => {
    setSelectedCategory(value);
  };

  const handleDeleteSuggestionModal = () => {
    setIsModalSuggestionDeleteOpen(!isModalSuggestionDeleteOpen);
  };

  const handleAddSuggestionModal = () => {
    setIsModalAddSuggestionOpen(!isModalAddSuggestionOpen);
  };

  const handleClaimRewardModal = () => {
    setIsModalClaimRewardOpen(!isModalClaimRewardOpen);
  };

  const addSuggestion = async (event) => {
    event.preventDefault();
    try {
      const defaultStatus = "Waiting";
      setIsAddBtnLoading(true);
      await axios.post("/api/suggestionData/addSuggestion", {
        title: title,
        currentCondition: currentCondition,
        suggestion: suggestion,
        userNik: userNik,
        userName: userName,
        category: category,
        status: defaultStatus,
        date: date,
      });
      setIsAddBtnLoading(false);
      setIsModalAddSuggestionOpen(false);
      setTitle("");
      setCurrentCondition("");
      setSuggestion("");
      setCategory("");
      getSuggestionByUserName();
    } catch (error) {
      console.log(error);
      setIsAddBtnLoading(false);
    }
  };

  const updateSuggestion = async (event) => {
    event.preventDefault();
    try {
      setIsEditBtnLoading(true);
      await axios.patch("/api/suggestionData/updateSuggestion", {
        docId: docId,
        category: selectedCategory,
        title: selectedTitle,
        currentCondition: selectedCurrentCondition,
        suggestion: selectedSuggestion,
      });
      setIsEditBtnLoading(false);
      setIsModalSuggestionDetailOpen(false);
      getSuggestionByUserName();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSuggestion = async () => {
    try {
      const response = await axios.get("/api/suggestionData/getAllSuggestion");
      setAllSuggestion(response.data);
    } catch (error) {
      console.error("Error fetching all suggestions:", error);
    }
  };

  const getSuggestionByUserName = async () => {
    try {
      if (userNik) {
        const response = await axios.get(
          `/api/suggestionData/getSuggestionByUserName?userNik=${userNik}`
        );
        setAllUserSuggestion(response.data);
      }
    } catch (error) {
      console.error("Error fetching all suggestions:", error);
    }
  };

  const setUserPoint = async () => {
    try {
      await axios.patch("/api/suggestionData/setUserPoint", {
        userNik: selectedNik,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSuggestionById = async (itemId) => {
    try {
      setIsDeleteBtnLoading(true);
      const response = await axios.get(
        `/api/suggestionData/getSuggestionById?docId=${itemId}`
      );
      setDocId(itemId);
      setSelectedTitle(response.data.title);
      setSelectedCurrentCondition(response.data.currentCondition);
      setSelectedSuggestion(response.data.suggestion);
      setSelectedCategory(response.data.category);
      setStatus(response.data.status);
      setSelectedName(response.data.userName);
      setSelectedNik(response.data.userNik);
      const formattedDate = format(new Date(response.data.date), "dd/MM/yyyy");
      setSelectedDate(formattedDate);
      setIsDeleteBtnLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStatus = async () => {
    try {
      await axios.patch("/api/suggestionData/updateStatus", {
        docId: docId,
        status: status,
      });
      setIsModalAdminSuggestionDetailOpen(false);
      await setUserPoint();
      getAllSuggestion();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSuggestion = async () => {
    try {
      setIsDeleteBtnLoading(true);
      await axios.delete(
        `/api/suggestionData/deleteSuggestion?docId=${docId}&userNik=${selectedNik}`
      );
      setIsDeleteBtnLoading(false);
      setIsModalSuggestionDeleteOpen(false);
      setIsModalSuggestionDetailOpen(false);
      setIsModalAdminSuggestionDetailOpen(false);
      getSuggestionByUserName();
      getAllSuggestion();
      setUserPoint();
    } catch (error) {
      console.log(error);
      setIsDeleteBtnLoading(false);
    }
  };

  const contextValue = {
    handleRadioChange,
    addSuggestion,
    updateSuggestion,
    getAllSuggestion,
    getSuggestionById,
    deleteSuggestion,
    handleEditRadioChange,
    handleDeleteSuggestionModal,
    handleAddSuggestionModal,
    getSuggestionByUserName,
    updateStatus,
    setUserPoint,
    handleClaimRewardModal,
  };

  return (
    <SuggestionDataContext.Provider value={contextValue}>
      {children}
    </SuggestionDataContext.Provider>
  );
};

export const useSuggestionDataContext = () => {
  const context = useContext(SuggestionDataContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
