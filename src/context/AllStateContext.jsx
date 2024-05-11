import React, { createContext, useContext, useState } from "react";

const AllStateContext = createContext();

export const AllStateProvider = ({ children }) => {
  const [allSuggestion, setAllSuggestion] = useState([]);
  const [allUserSuggestion, setAllUserSuggestion] = useState([]);
  const [docId, setDocId] = useState("");
  const [dateNow, setDateNow] = useState("");

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedNik, setSelectedNik] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCurrentCondition, setSelectedCurrentCondition] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const [isModalSuggestionDetailOpen, setIsModalSuggestionDetailOpen] =
    useState(false);
  const [
    isModalAdminSuggestionDetailOpen,
    setIsModalAdminSuggestionDetailOpen,
  ] = useState(false);
  const [isModalSuggestionDeleteOpen, setIsModalSuggestionDeleteOpen] =
    useState(false);

  const [isDeleteBtnLoading, setIsDeleteBtnLoading] = useState(false);
  const [isAddBtnLoading, setIsAddBtnLoading] = useState(false);
  const [isEditBtnLoading, setIsEditBtnLoading] = useState(false);
  const [isModalAddSuggestionOpen, setIsModalAddSuggestionOpen] =
    useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const contextValue = {
    dateNow,
    setDateNow,
    allSuggestion,
    allUserSuggestion,
    setAllSuggestion,
    category,
    setCategory,
    selectedDate,
    title,
    currentCondition,
    suggestion,
    status,
    setStatus,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    isModalSuggestionDetailOpen,
    isModalAdminSuggestionDetailOpen,
    setIsModalSuggestionDetailOpen,
    setIsModalAdminSuggestionDetailOpen,
    setIsModalAddSuggestionOpen,
    isModalAddSuggestionOpen,
    selectedCategory,
    setSelectedCategory,
    selectedTitle,
    setSelectedTitle,
    selectedCurrentCondition,
    selectedName,
    selectedNik,
    setSelectedCurrentCondition,
    selectedSuggestion,
    setSelectedSuggestion,
    setSelectedName,
    setSelectedNik,
    docId,
    setDocId,
    isModalSuggestionDeleteOpen,
    setIsModalSuggestionDeleteOpen,
    isAddBtnLoading,
    setIsAddBtnLoading,
    isEditBtnLoading,
    setIsEditBtnLoading,
    showMenu,
    setShowMenu,
    isDeleteBtnLoading,
    setIsDeleteBtnLoading,
    setAllUserSuggestion,
    setSelectedDate,
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
