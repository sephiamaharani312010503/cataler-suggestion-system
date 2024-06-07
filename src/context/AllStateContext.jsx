import React, { createContext, useContext, useState } from "react";

const AllStateContext = createContext();

export const AllStateProvider = ({ children }) => {
  const [allSuggestion, setAllSuggestion] = useState([]);
  const [allUserSuggestion, setAllUserSuggestion] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [docId, setDocId] = useState("");
  const [dateNow, setDateNow] = useState("");

  const [userPoint, setUserPoint] = useState("");

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [selectedName, setSelectedName] = useState("");
  const [selectedNik, setSelectedNik] = useState("");

  const [editName, setEditName] = useState("");
  const [editNik, setEditNik] = useState("");
  const [editJabatan, setEditJabatan] = useState("");
  const [editDepartemen, setEditDepartemen] = useState("");
  const [editRole, setEditRole] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCurrentCondition, setSelectedCurrentCondition] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const [isModalSuggestionDetailOpen, setIsModalSuggestionDetailOpen] =
    useState(false);
  const [isModalUserDetailOpen, setIsModalUserDetailOpen] = useState(false);
  const [
    isModalAdminSuggestionDetailOpen,
    setIsModalAdminSuggestionDetailOpen,
  ] = useState(false);
  const [isModalSuggestionDeleteOpen, setIsModalSuggestionDeleteOpen] =
    useState(false);
  const [isModalUserDeleteOpen, setIsModalUserDeleteOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);

  const [isDeleteBtnLoading, setIsDeleteBtnLoading] = useState(false);
  const [isAddBtnLoading, setIsAddBtnLoading] = useState(false);
  const [isEditBtnLoading, setIsEditBtnLoading] = useState(false);
  const [isModalAddSuggestionOpen, setIsModalAddSuggestionOpen] =
    useState(false);
  const [isModalStatusDetailOpen, setIsModalStatusDetailOpen] = useState(false);
  const [isModalClaimRewardOpen, setIsModalClaimRewardOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [isUserManageBtnActive, setIsUserManageBtnActive] = useState(false);
  const [isSuggestionManageBtnActive, setIsSuggestionManageBtnActive] =
    useState(false);
  const [isDashboardBtnActive, setIsDashboardBtnActive] = useState(true);

  const [addedUserDepartemen, setAddedUserDepartemen] = useState("");
  const [addedUserJabatan, setAddedUserJabatan] = useState("");
  const [addedUserName, setAddedUserName] = useState("");
  const [addedUserNik, setAddedUserNik] = useState("");
  const [addedUserRole, setAddedUserRole] = useState("User");

  const [imageFile, setImageFile] = useState(null);

  const [isSuggestionAccView, setIsSuggestionAccView] = useState(false);
  const [isSuggestionAllView, setIsSuggestionAllView] = useState(false);
  const [isSuggestionDisapproveView, setIsSuggestionDisapproveView] =
    useState(false);
  const [isUserManagementView, setIsUserManagementView] = useState(false);

  const [isStatUserClicked, setIsStatUserClicked] = useState(false);
  const [isStatClicked, setIsStatClicked] = useState(false);

  const [isModalAttachmentDetailOpen, setIsModalAttachmentDetailOpen] =
    useState(false);
  const [isModalAttachmentOpen, setIsModalAttachmentOpen] = useState(false);
  const [isImageBeforeUploaded, setIsImageBeforeUploaded] = useState(false);

  const [imageBefore, setImageBefore] = useState([null]);
  const [imageAfter, setImageAfter] = useState([null]);

  const [lastDocId, setLastDocId] = useState("");
  const [imageBeforeUrl, setImageBeforeUrl] = useState("");
  const [imageAfterUrl, setImageAfterUrl] = useState("");

  const [isImage1Uploading, setIsImage1Uploading] = useState(false);
  const [isImage2Uploading, setIsImage2Uploading] = useState(false);

  const [errorMessageImageBefore, setErrorMessageImageBefore] = useState("");
  const [errorMessageImageAfter, setErrorMessageImageAfter] = useState("");

  const contextValue = {
    dateNow,
    setDateNow,
    allSuggestion,
    allUserSuggestion,
    setAllSuggestion,
    category,
    setCategory,
    selectedDate,
    imageFile,
    setImageFile,
    title,
    currentCondition,
    suggestion,
    status,
    date,
    setDate,
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
    isModalStatusDetailOpen,
    setIsModalStatusDetailOpen,
    isUserManageBtnActive,
    setIsUserManageBtnActive,
    isSuggestionManageBtnActive,
    setIsSuggestionManageBtnActive,
    isDashboardBtnActive,
    setIsDashboardBtnActive,
    addedUserDepartemen,
    addedUserJabatan,
    addedUserName,
    addedUserNik,
    addedUserRole,
    setAddedUserDepartemen,
    setAddedUserJabatan,
    setAddedUserName,
    setAddedUserNik,
    setAddedUserRole,
    allUserData,
    setAllUserData,
    userPoint,
    setUserPoint,
    isModalAddUserOpen,
    setIsModalAddUserOpen,
    isModalUserDetailOpen,
    setIsModalUserDetailOpen,
    editName,
    editNik,
    editJabatan,
    editDepartemen,
    editRole,
    setEditName,
    setEditNik,
    setEditJabatan,
    setEditDepartemen,
    setEditRole,
    isModalUserDeleteOpen,
    setIsModalUserDeleteOpen,
    isModalClaimRewardOpen,
    setIsModalClaimRewardOpen,
    isSuggestionAccView,
    setIsSuggestionAccView,
    isSuggestionAllView,
    setIsSuggestionAllView,
    isSuggestionDisapproveView,
    setIsSuggestionDisapproveView,
    isStatClicked,
    setIsStatClicked,
    isUserManagementView,
    setIsUserManagementView,
    isStatUserClicked,
    setIsStatUserClicked,
    isModalAttachmentOpen,
    setIsModalAttachmentOpen,
    imageBefore,
    setImageBefore,
    imageAfter,
    setImageAfter,
    lastDocId,
    setLastDocId,
    isImageBeforeUploaded,
    setIsImageBeforeUploaded,
    imageBeforeUrl,
    imageAfterUrl,
    setImageBeforeUrl,
    setImageAfterUrl,
    isImage1Uploading,
    setIsImage1Uploading,
    isImage2Uploading,
    setIsImage2Uploading,
    errorMessageImageBefore,
    setErrorMessageImageBefore,
    errorMessageImageAfter,
    setErrorMessageImageAfter,
    isModalAttachmentDetailOpen,
    setIsModalAttachmentDetailOpen,
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
