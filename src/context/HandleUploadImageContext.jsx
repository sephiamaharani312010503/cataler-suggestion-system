import React, { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import axios from "axios";

const HandleUploadImageContext = createContext();

const MAX_FILE_SIZE_MB = 3;

export const HandleUploadImageContextProvider = ({ children }) => {
  const {
    imageBefore,
    imageAfter,
    setImageBefore,
    setImageAfter,
    lastDocId,
    setLastDocId,
    setIsImageBeforeUploaded,
    setIsImage1Uploading,
    setIsImage2Uploading,
    setImageBeforeUrl,
    setImageAfterUrl,
    setErrorMessageImageBefore,
    setErrorMessageImageAfter,
  } = useAllStateContext();

  const handleChangeImageBefore = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      alert(
        `File terlalu besar. Maksimum ukuran file adalah ${MAX_FILE_SIZE_MB} MB`
      );
      return;
    }
    setImageBefore(selectedFile);
  };

  const handleChangeImageAfter = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      alert(
        `File terlalu besar. Maksimum ukuran file adalah ${MAX_FILE_SIZE_MB} MB`
      );
      return;
    }
    setImageAfter(selectedFile);
    console.log("Selected file:", selectedFile);
  };

  const uploadImageBefore = async () => {
    try {
      setIsImage1Uploading(true);
      if (imageBefore[0] !== null) {
        const formData = new FormData();
        formData.append("imageToUpload", imageBefore);
        const response = await axios.post(
          "/api/suggestionData/uploadImageBefore",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const { id, url } = response.data;
        setImageBeforeUrl(url);
        setLastDocId(id);
        setIsImageBeforeUploaded(true);
        setIsImage1Uploading(false);
      } else {
        console.log("gagal");
        setIsImage1Uploading(false);
        setErrorMessageImageBefore("Pilih File!");
      }
    } catch (error) {
      setIsImage1Uploading(false);
      console.error(
        "Terjadi kesalahan saat mengunggah file:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const uploadImageAfter = async () => {
    try {
      setIsImage2Uploading(true);
      if (imageAfter[0] !== null) {
        const formData = new FormData();
        formData.append("lastDocId", lastDocId);
        formData.append("imageToUpload", imageAfter);

        const response = await axios.post(
          "/api/suggestionData/uploadImageAfter",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const { url } = response.data;
        setImageAfterUrl(url);
        setIsImage2Uploading(false);
      } else {
        console.log("gagal");
        setIsImage2Uploading(false);
        setErrorMessageImageAfter("Pilih File!");
      }
    } catch (error) {
      setIsImage2Uploading(false);
      console.error(
        "Terjadi kesalahan saat mengunggah file:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteImage = async (filePath) => {
    try {
      await axios.delete("/api/suggestionData/deleteImage", {
        data: { filePath },
      });
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const contextValue = {
    deleteImage,
    handleChangeImageBefore,
    handleChangeImageAfter,
    uploadImageBefore,
    uploadImageAfter,
  };

  return (
    <HandleUploadImageContext.Provider value={contextValue}>
      {children}
    </HandleUploadImageContext.Provider>
  );
};

export const useHandleUploadImageContext = () => {
  const context = useContext(HandleUploadImageContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
