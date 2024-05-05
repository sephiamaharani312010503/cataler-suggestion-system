import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AllStateContext = createContext();

export const AllStateProvider = ({
  children,
}) => {
  const [allSuggestion, setAllSuggestion] =
    useState([]);
  const [docId, setDocId] = useState("");
  const [dateNow, setDateNow] = useState("");

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [currentCondition, setCurrentCondition] =
    useState("");
  const [suggestion, setSuggestion] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(null);
  const [selectedTitle, setSelectedTitle] =
    useState("");
  const [
    selectedCurrentCondition,
    setSelectedCurrentCondition,
  ] = useState("");
  const [
    selectedSuggestion,
    setSelectedSuggestion,
  ] = useState("");

  const [
    isModalSuggestionDetailOpen,
    setIsModalSuggestionDetailOpen,
  ] = useState(false);
  const [
    isModalSuggestionDeleteOpen,
    setIsModalSuggestionDeleteOpen,
  ] = useState(false);

  const [
    isDeleteBtnLoading,
    setIsDeleteBtnLoading,
  ] = useState(false);
  const [isAddBtnLoading, setIsAddBtnLoading] =
    useState(false);
  const [isEditBtnLoading, setIsEditBtnLoading] =
    useState(false);
  const [
    isModalAddSuggestionOpen,
    setIsModalAddSuggestionOpen,
  ] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const contextValue = {
    dateNow,
    setDateNow,
    allSuggestion,
    setAllSuggestion,
    category,
    setCategory,
    title,
    currentCondition,
    suggestion,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    isModalSuggestionDetailOpen,
    setIsModalSuggestionDetailOpen,
    setIsModalAddSuggestionOpen,
    isModalAddSuggestionOpen,
    selectedCategory,
    setSelectedCategory,
    selectedTitle,
    setSelectedTitle,
    selectedCurrentCondition,
    setSelectedCurrentCondition,
    selectedSuggestion,
    setSelectedSuggestion,
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
  };

  return (
    <AllStateContext.Provider
      value={contextValue}>
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
