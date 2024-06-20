import React, { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import { useSessionContext } from "./SessionContext";
import axios from "axios";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useHandleUploadImageContext } from "./HandleUploadImageContext";

const SuggestionDataContext = createContext();

export const SuggestionDataContextProvider = ({ children }) => {
  const { userNik, userName, userJabatan, userDepartemen } =
    useSessionContext();
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
    allSuggestion,
    allUserData,
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
    setIsStatClicked,
    setIsStatUserClicked,
    setIsSuggestionAllView,
    setIsSuggestionAccView,
    setIsSuggestionDisapproveView,
    setIsUserManagementView,
    lastDocId,
    setIsImageBeforeUploaded,
    setImageBeforeUrl,
    setImageAfterUrl,
    selectedName,
    selectedJabatan,
    selectedDepartemen,
    imageName,
    setImageName,
    imageBeforeUrl,
    imageAfterUrl,
    selectedDate,
    setSelectedJabatan,
    setSelectedDepartemen,
  } = useAllStateContext();
  const { deleteImage } = useHandleUploadImageContext();

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

  const handleAllSuggestionView = () => {
    setIsSuggestionAllView(true);
    setIsSuggestionAccView(false);
    setIsSuggestionDisapproveView(false);
  };

  const handleAccSuggestionView = () => {
    setIsSuggestionAllView(false);
    setIsSuggestionAccView(true);
    setIsSuggestionDisapproveView(false);
  };

  const handleDisapproveSuggestionView = () => {
    setIsSuggestionAllView(false);
    setIsSuggestionAccView(false);
    setIsSuggestionDisapproveView(true);
  };

  const resetStatBtn = () => {
    setIsStatClicked(false);
    setIsStatUserClicked(false);
    setIsSuggestionAllView(false);
    setIsSuggestionAccView(false);
    setIsSuggestionDisapproveView(false);
    setIsUserManagementView(false);
  };

  const resetUrl = () => {
    setImageBeforeUrl("");
    setImageAfterUrl("");
  };

  const addSuggestion = async (event) => {
    event.preventDefault();
    try {
      const defaultStatus = "Waiting";
      setIsAddBtnLoading(true);
      await axios.patch("/api/suggestionData/addSuggestion", {
        docId: lastDocId,
        userName: userName,
        userNik: userNik,
        userJabatan: userJabatan,
        userDepartemen: userDepartemen,
        title: title,
        currentCondition: currentCondition,
        suggestion: suggestion,
        category: category,
        status: defaultStatus,
        date: date,
      });
      setIsImageBeforeUploaded(false);
      setIsAddBtnLoading(false);
      setIsModalAddSuggestionOpen(false);
      setTitle("");
      setCurrentCondition("");
      setSuggestion("");
      setCategory("");
      getSuggestionByUserName();
      resetUrl();
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
      setSelectedName(response.data.name);
      setSelectedNik(response.data.nik);
      setSelectedJabatan(response.data.jabatan);
      setSelectedDepartemen(response.data.departemen);
      setImageBeforeUrl(response.data.imageBefore?.url);
      setImageAfterUrl(response.data.imageAfter?.url);
      setImageName(response.data.imageBefore.name);
      const formattedDate = format(Date(response.data.date), "dd/MM/yyyy");
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
      await deleteImage(`Kaizen/${imageName}`);
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

  const exportToPdf = () => {
    const doc = new jsPDF();

    const addHeader = () => {
      const img = new Image();
      const logoUrl = "/static/assets/logo-single.jpg";
      img.src = logoUrl;

      img.onload = () => {
        doc.addImage(img, "jpg", 12.5, 8, 30, 15);
        doc.setFont("Poppins");
        doc.setFontSize(18);
        doc.text("PT Cataler Indonesia", 45, 18);
        doc.setFontSize(11);
        doc.text(
          "Blok AE No. 2 Greenland Internasional Industrial Center ( GIIC)",
          13,
          25
        );
        doc.text("Kota Deltamas, Jl. Tol Jakarta-Cikampek, Km.37", 13, 30);
        doc.text("Cikarang Pusat, Bekasi, Indonesia", 13, 35);
        doc.setLineWidth(0.3);
        doc.line(13, 38, 200, 38);

        addContent();
      };
    };

    const addContent = () => {
      const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
      };

      const currentDate = getCurrentDate();

      doc.setFontSize(18);
      doc.text("Data Suggestion System", 78, 50);

      const combinedData = allSuggestion.map((suggestion) => {
        const users = allUserData.find((data) => data.nik === suggestion.nik);
        return {
          ...suggestion,
          ...users,
        };
      });

      doc.autoTable({
        startX: 10,
        startY: 55,
        head: [["NIK", "Nama", "Judul Saran", "Point", "Status", "Tanggal"]],
        body: combinedData.map((item) => [
          item.nik,
          item.name,
          item.title,
          item.point,
          item.status,
          format(Date(item.date), "dd/MM/yyyy"),
        ]),
        theme: "grid",
        headStyles: { fillColor: [22, 160, 133], halign: "center" },
        columnStyles: {
          0: { halign: "center" },
          1: { halign: "center" },
          2: { halign: "left" },
          3: { halign: "center" },
          4: { halign: "center" },
          5: { halign: "center" },
        },
        styles: { font: "times", fontSize: 12 },
      });

      doc.setFontSize(12);
      doc.text("Bekasi,", 162, 200);
      doc.text(currentDate, 176, 200);
      doc.text("Section Head", 168, 234);

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
          `Page ${i} of ${pageCount}`,
          14,
          doc.internal.pageSize.height - 10
        );
      }
      doc.save("report.pdf");
    };

    addHeader();
  };

  const contextValue = {
    exportToPdf,
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
    handleAllSuggestionView,
    handleAccSuggestionView,
    handleDisapproveSuggestionView,
    resetStatBtn,
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
