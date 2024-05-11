import Modal from "@/components/Modal";
import React, { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import { useSuggestionDataContext } from "./SuggestionDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ModalFunctionContext = createContext();

export const ModalFunctionContextProvider = ({ children }) => {
  const {
    title,
    currentCondition,
    suggestion,
    category,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    selectedCategory,
    selectedTitle,
    selectedCurrentCondition,
    selectedSuggestion,
    setSelectedTitle,
    setSelectedCurrentCondition,
    setSelectedSuggestion,
    setIsModalSuggestionDetailOpen,
    isEditBtnLoading,
    setIsModalAddSuggestionOpen,
    isAddBtnLoading,
    isDeleteBtnLoading,
    selectedDate,
    status,
    setIsModalAdminSuggestionDetailOpen,
    selectedName,
    selectedNik,
  } = useAllStateContext();

  const {
    addSuggestion,
    handleDeleteSuggestionModal,
    handleEditRadioChange,
    handleRadioChange,
    updateSuggestion,
    deleteSuggestion,
  } = useSuggestionDataContext();

  const modalAddSuggestion = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalAddSuggestionOpen(false)}
                className="me-1">
                ✕
              </button>
            </div>
            <form onSubmit={addSuggestion}>
              <div className="form-control">
                <div className="flex justify-center mt-3">
                  <div className="flex">
                    <label className="label cursor-pointer">
                      <input
                        onChange={() => handleRadioChange("5S")}
                        checked={category === "5S"}
                        type="radio"
                        className="radio checked:bg-green-500"
                      />
                      <span className="label-text text-emerald-600 font-semibold ms-1">
                        5S
                      </span>
                      <input
                        onChange={() => handleRadioChange("Safety")}
                        checked={category === "Safety"}
                        type="radio"
                        className="radio checked:bg-warning ms-3"
                      />
                      <span className="label-text ms-1 text-yellow-500 font-semibold">
                        Safety
                      </span>
                      <input
                        onChange={() => handleRadioChange("Improvement")}
                        checked={category === "Improvement"}
                        type="radio"
                        className="radio checked:bg-blue-500 ms-3"
                      />
                      <span className="label-text ms-1 text-blue-500 font-semibold">
                        Improvement
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center mt-2"></div>
                <label className="label text-sm">Judul :</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Kondisi Saat ini :</label>
                <textarea
                  value={currentCondition}
                  onChange={(e) => setCurrentCondition(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
                <label className="label text-sm">Saran Yang Diusulkan :</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
                <label className="label text-sm">Lampiran :</label>
                <div className="flex justify-between mb-2">
                  <input className="input input-sm input-bordered" />
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary text-white">
                    {isAddBtnLoading ? (
                      <span className="flex items-center">
                        <span className="loading loading-spinner mr-2"></span>
                        Loading...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalSuggestionDetail = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalSuggestionDetailOpen(false)}
                className="me-1">
                ✕
              </button>
            </div>
            <div className="container flex w-full justify-between mt-4">
              <p className="text-sm font-semibold">{selectedDate}</p>
              <p className="text-sm font-semibold me-1">{status}</p>
            </div>
            <hr className="mt-1" />
            <form onSubmit={updateSuggestion}>
              <div className="form-control">
                <div className="flex justify-center mt-3">
                  <div className="flex">
                    <label className="label cursor-pointer">
                      <input
                        onChange={() => handleEditRadioChange("5S")}
                        checked={selectedCategory === "5S"}
                        type="radio"
                        className="radio checked:bg-green-500"
                      />
                      <span className="label-text text-emerald-600 font-semibold ms-1">
                        5S
                      </span>
                      <input
                        onChange={() => handleEditRadioChange("Safety")}
                        checked={selectedCategory === "Safety"}
                        type="radio"
                        className="radio checked:bg-warning ms-3"
                      />
                      <span className="label-text ms-1 text-yellow-500 font-semibold">
                        Safety
                      </span>
                      <input
                        onChange={() => handleEditRadioChange("Improvement")}
                        checked={selectedCategory === "Improvement"}
                        type="radio"
                        className="radio checked:bg-blue-500 ms-3"
                      />
                      <span className="label-text ms-1 text-blue-500 font-semibold">
                        Improvement
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center mt-2"></div>
                <label className="label text-sm">Judul :</label>
                <input
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Kondisi Saat ini :</label>
                <textarea
                  value={selectedCurrentCondition}
                  onChange={(e) => setSelectedCurrentCondition(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
                <label className="label text-sm">Saran Yang Diusulkan :</label>
                <textarea
                  value={selectedSuggestion}
                  onChange={(e) => setSelectedSuggestion(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
                <label className="label text-sm">Lampiran :</label>
                <div className="flex justify-between mb-2">
                  <input className="input input-sm input-bordered" />
                  <div className="flex justify-end">
                    <button
                      onClick={handleDeleteSuggestionModal}
                      type="button"
                      className="btn btn-sm btn-error text-white me-2">
                      {isDeleteBtnLoading ? (
                        <span className="loading loading-spinner mr-2"></span>
                      ) : (
                        <FontAwesomeIcon icon={faTrashCan} />
                      )}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary text-white">
                      {isEditBtnLoading ? (
                        <span className="flex items-center">
                          <span className="loading loading-spinner mr-2"></span>
                          Loading...
                        </span>
                      ) : (
                        "Edit"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalAdminSuggestionDetail = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalAdminSuggestionDetailOpen(false)}
                className="me-1">
                ✕
              </button>
            </div>
            <div className="container flex w-full justify-between mt-4 px-1">
              <p className="text-sm font-semibold">
                {selectedName} / {selectedNik}
              </p>
              <p className="text-sm font-semibold">
                Status : <span className="ms-1 ">{status}</span>
              </p>
            </div>
            <hr className="mt-1 px-1" />
            <div className="container flex w-full justify-between mt-2 px-1">
              <p className="text-sm font-semibold">
                Kategori : {selectedCategory}
              </p>
              <p className="text-sm font-semibold">{selectedDate}</p>
            </div>
            <div className="form-control mt-2">
              <div className="flex justify-center"></div>
              <label className="label text-sm">Judul :</label>
              <input
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="input input-sm input-bordered w-full"
                readOnly
              />
              <label className="label text-sm">Kondisi Saat ini :</label>
              <textarea
                value={selectedCurrentCondition}
                onChange={(e) => setSelectedCurrentCondition(e.target.value)}
                className="textarea textarea-bordered w-full"
                readOnly
              />
              <label className="label text-sm">Saran Yang Diusulkan :</label>
              <textarea
                value={selectedSuggestion}
                onChange={(e) => setSelectedSuggestion(e.target.value)}
                className="textarea textarea-bordered w-full"
                readOnly
              />
              <label className="label text-sm">Lampiran :</label>
              <div className="flex justify-between mb-2">
                <input className="input input-sm input-bordered" />
                <div className="flex justify-end">
                  <button
                    onClick={handleDeleteSuggestionModal}
                    type="button"
                    className="btn btn-sm btn-error text-white me-2">
                    {isDeleteBtnLoading ? (
                      <span className="loading loading-spinner mr-2"></span>
                    ) : (
                      <FontAwesomeIcon icon={faTrashCan} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
    );
  };

  const modalStatusDetail = () => {};

  const modalDeleteSuggestion = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <p>Anda yakin ingin menghapus data?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteSuggestionModal}
                className="btn btn-sm bg-blue-700 text-white">
                Tidak
              </button>
              <button
                onClick={deleteSuggestion}
                className="btn btn-sm btn-error ms-2">
                {isDeleteBtnLoading ? (
                  <span className="loading loading-spinner mr-2"></span>
                ) : (
                  "Ya"
                )}
              </button>
            </div>
          </div>
        }
      />
    );
  };

  const contextValue = {
    modalSuggestionDetail,
    modalAdminSuggestionDetail,
    modalDeleteSuggestion,
    modalAddSuggestion,
  };

  return (
    <ModalFunctionContext.Provider value={contextValue}>
      {children}
    </ModalFunctionContext.Provider>
  );
};

export const useModalFunctionContext = () => {
  const context = useContext(ModalFunctionContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
