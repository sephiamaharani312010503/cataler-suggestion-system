import React, { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import { useSessionContext } from "./SessionContext";
import axios from "axios";

const SuggestionDataContext = createContext();

export const SuggestionDataContextProvider = ({ children }) => {
  const { userNik } = useSessionContext();
  const {
    title,
    currentCondition,
    suggestion,
    category,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    setCategory,
    setAllSuggestion,
    setIsModalSuggestionDetailOpen,
    selectedCategory,
    selectedTitle,
    selectedCurrentCondition,
    selectedSuggestion,
    setSelectedCategory,
    setSelectedTitle,
    setSelectedCurrentCondition,
    setSelectedSuggestion,
    docId,
    setDocId,
    isModalSuggestionDeleteOpen,
    setIsModalSuggestionDeleteOpen,
    isModalAddSuggestionOpen,
    setIsModalAddSuggestionOpen,
    setIsAddBtnLoading,
    setIsEditBtnLoading,
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

  const addSuggestion = async (event) => {
    event.preventDefault();
    try {
      setIsAddBtnLoading(true);
      await axios.post("/api/suggestionData/addSuggestion", {
        title: title,
        currentCondition: currentCondition,
        suggestion: suggestion,
        userNik: userNik,
        category: category,
      });
      setIsAddBtnLoading(false);
      setIsModalAddSuggestionOpen(false);
      setTitle("");
      setCurrentCondition("");
      setSuggestion("");
      setCategory("");
      getAllSuggestion();
    } catch (error) {
      console.log(error);
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
      getAllSuggestion();
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

  const getSuggestionById = async (itemId) => {
    try {
      setIsModalSuggestionDetailOpen(true);
      const response = await axios.get(
        `/api/suggestionData/getSuggestionById?docId=${itemId}`
      );
      setDocId(itemId);
      setSelectedTitle(response.data.title);
      setSelectedCurrentCondition(response.data.currentCondition);
      setSelectedSuggestion(response.data.suggestion);
      setSelectedCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteSuggestion = async () => {
    try {
      await axios.delete(`/api/suggestionData/deleteSuggestion?docId=${docId}`);
      setIsModalSuggestionDeleteOpen(false);
      setIsModalSuggestionDetailOpen(false);
      getAllSuggestion();
    } catch (error) {
      console.log(error);
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
