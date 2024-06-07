import Modal from "@/components/Modal";
import React, { createContext, useContext } from "react";
import { useAllStateContext } from "./AllStateContext";
import { useSuggestionDataContext } from "./SuggestionDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useUserDataContext } from "./UserDataContext";
import { useHandleUploadImageContext } from "./HandleUploadImageContext";
import Image from "next/image";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

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
    setIsModalAdminSuggestionDetailOpen,
    setIsModalAddUserOpen,
    selectedName,
    selectedNik,
    setIsModalStatusDetailOpen,
    setStatus,
    status,
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
    setIsModalAttachmentOpen,
    isImage1Uploading,
    isImage2Uploading,
    imageBeforeUrl,
    imageAfterUrl,
    imageBefore,
    imageAfter,
    errorMessageImageBefore,
    setErrorMessageImageBefore,
    errorMessageImageAfter,
    setErrorMessageImageAfter,
    setIsModalAttachmentDetailOpen,
    setImageBeforeUrl,
    setImageAfterUrl,
  } = useAllStateContext();

  const {
    handleChangeImageBefore,
    handleChangeImageAfter,
    uploadImageBefore,
    uploadImageAfter,
  } = useHandleUploadImageContext();

  const {
    addSuggestion,
    handleDeleteSuggestionModal,
    handleEditRadioChange,
    handleRadioChange,
    updateSuggestion,
    deleteSuggestion,
    updateStatus,
    handleClaimRewardModal,
  } = useSuggestionDataContext();

  const { addUser, updateUser, handleDeleteUserModal, deleteUser } =
    useUserDataContext();

  const modalAddUser = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-between">
              <h1 className="font-bold">Tambah User</h1>
              <button
                onClick={() => setIsModalAddUserOpen(false)}
                className="me-1">
                ✕
              </button>
            </div>
            <hr className="mt-2" />
            <form onSubmit={addUser}>
              <div className="form-control">
                <div className="flex justify-center mt-1"></div>
                <label className="label text-sm">NIK :</label>
                <input
                  value={addedUserNik}
                  onChange={(e) => setAddedUserNik(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Nama :</label>
                <input
                  value={addedUserName}
                  onChange={(e) => setAddedUserName(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Jabatan :</label>
                <input
                  value={addedUserJabatan}
                  onChange={(e) => setAddedUserJabatan(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Departemen :</label>
                <input
                  value={addedUserDepartemen}
                  onChange={(e) => setAddedUserDepartemen(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Role :</label>
                <select
                  className="select select-sm select-bordered"
                  value={addedUserRole}
                  onChange={(e) => setAddedUserRole(e.target.value)}>
                  <option value={"Admin"}>Admin</option>
                  <option value={"User"}>User</option>
                  <option value={"Section Head"}>Section Head</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary text-white mt-4">
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
            </form>
          </>
        }
      />
    );
  };

  const modalUserDetail = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-between">
              <h1 className="font-bold">Edit User</h1>
              <button
                onClick={() => setIsModalUserDetailOpen(false)}
                className="me-1">
                ✕
              </button>
            </div>
            <hr className="mt-2" />
            <form onSubmit={updateUser}>
              <div className="form-control">
                <label className="label text-sm">NIK :</label>
                <input
                  value={editNik}
                  onChange={(e) => setEditNik(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Nama :</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Jabatan :</label>
                <input
                  value={editJabatan}
                  onChange={(e) => setEditJabatan(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Departemen :</label>
                <input
                  value={editDepartemen}
                  onChange={(e) => setEditDepartemen(e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
                <label className="label text-sm">Role :</label>
                <select
                  className="select select-sm select-bordered"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}>
                  <option value={"Admin"}>Admin</option>
                  <option value={"User"}>User</option>
                  <option value={"Section Head"}>Section Head</option>
                </select>
                <div className="flex w-full mt-4 justify-end">
                  <button
                    onClick={handleDeleteUserModal}
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
                    className="btn btn-sm btn-primary text-white px-6">
                    {isAddBtnLoading ? (
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
            </form>
          </>
        }
      />
    );
  };

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
                <div className="flex items-center justify-between mb-2 mt-3">
                  <button
                    onClick={() => setIsModalAttachmentDetailOpen(true)}
                    type="button"
                    className="link text-secondary ms-1 me-20">
                    <FontAwesomeIcon icon={faPaperclip} />
                    <span className="ms-1 italic font-semibold">
                      Lihat Lampiran
                    </span>
                  </button>
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
            <div className="container flex items-center w-full justify-between mt-4 px-1">
              <p className="text-sm font-semibold">
                {selectedName} / {selectedNik}
              </p>
              <label className="label cursor-pointer text-sm">
                Status :
                <select
                  className="select select-sm select-bordered ms-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="ACC">ACC</option>
                  <option value="Disapprove">Disapprove</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </label>
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
                  <button
                    onClick={updateStatus}
                    type="button"
                    className="btn btn-sm btn-primary text-white me-2">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
    );
  };

  const modalStatusDetail = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalStatusDetailOpen(false)}
                className="me-1">
                ✕
              </button>
            </div>
            <div className="container flex w-full justify-between mt-4">
              <p className="text-sm font-semibold">{selectedDate}</p>
              <p className="text-sm font-semibold me-1">{status}</p>
            </div>
            <hr className="mt-1" />
            <form>
              <div className="form-control">
                <div className="mt-3"></div>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalDeleteUser = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <p>Anda yakin ingin menghapus data?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteUserModal}
                className="btn btn-sm bg-blue-700 text-white">
                Tidak
              </button>
              <button
                onClick={deleteUser}
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

  const modalAddAttachment = () => {
    return (
      <dialog className="modal" open>
        <div className="modal-box w-1/2 max-w-5xl">
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold">Tambah Lampiran</h1>
              <button
                onClick={() => {
                  setErrorMessageImageBefore("");
                  setErrorMessageImageAfter("");
                  setIsModalAttachmentOpen(false);
                }}
                className="me-1">
                ✕
              </button>
            </div>
            <hr className="mt-2" />
            <div className="border mt-2 p-2">
              <div className="flex">
                <div className="w-1/2">
                  <p className="font-semibol underline text-center">
                    Sebelum Kaizen :
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-semibol underline text-center">
                    Sesudah Kaizen :
                  </p>
                </div>
              </div>
              <div className="flex jutify-between min-w-full mt-2">
                <div className="w-1/2 min-h-36">
                  <div className="pe-3">
                    {imageBeforeUrl ? (
                      <Image
                        src={imageBeforeUrl}
                        alt="Uploaded Image"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="w-1/2 min-h-36 ">
                  <div className="ps-3">
                    {imageAfterUrl ? (
                      <Image
                        src={imageAfterUrl}
                        alt="Uploaded Image"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <hr className="mt-2" />
              <div className="flex">
                <div className="w-1/2 pe-3">
                  <input
                    type="file"
                    onChange={handleChangeImageBefore}
                    className="file-input file-input-sm file-input-bordered mt-3"
                  />
                  <button
                    onClick={uploadImageBefore}
                    className="btn btn-sm w-full mt-2">
                    {isImage1Uploading ? "Uploading..." : "Upload"}
                  </button>
                  {Array.isArray(imageBefore) && imageBefore[0] == null ? (
                    <p className="text-center mt-2 text-error">
                      {errorMessageImageBefore}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-1/2 ps-3">
                  <input
                    type="file"
                    onChange={handleChangeImageAfter}
                    className="file-input file-input-sm file-input-bordered mt-3"
                  />
                  <button
                    onClick={uploadImageAfter}
                    className="btn btn-sm w-full mt-2">
                    {isImage2Uploading ? "Uploading..." : "Upload"}
                  </button>
                  {Array.isArray(imageAfter) && imageAfter[0] == null ? (
                    <p className="text-center mt-2 text-error">
                      {errorMessageImageAfter}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setErrorMessageImageBefore("");
                  setErrorMessageImageAfter("");
                  setIsModalAttachmentOpen(false);
                }}
                className="btn btn-sm btn-primary text-white mt-3">
                Selesai
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  };
  const modalAttachmentDetail = () => {
    return (
      <dialog className="modal" open>
        <div className="modal-box w-1/2 max-w-5xl">
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold">Lampiran</h1>
              <button
                onClick={() => {
                  setIsModalAttachmentDetailOpen(false);
                }}
                className="me-1">
                ✕
              </button>
            </div>
            <hr className="mt-2" />
            <div className="border mt-2 p-2">
              <div className="flex">
                <div className="w-1/2">
                  <p className="font-semibol underline text-center">
                    Sebelum Kaizen :
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-semibol underline text-center">
                    Sesudah Kaizen :
                  </p>
                </div>
              </div>
              <div className="flex jutify-between min-w-full mt-2">
                <div className="w-1/2 min-h-36">
                  <div className="pe-3">
                    {imageBeforeUrl ? (
                      <Image
                        src={imageBeforeUrl}
                        alt="Uploaded Image"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="w-1/2 min-h-36 ">
                  <div className="ps-3">
                    {imageAfterUrl ? (
                      <Image
                        src={imageAfterUrl}
                        alt="Uploaded Image"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-2" />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsModalAttachmentDetailOpen(false);
                }}
                className="btn btn-sm btn-primary text-white mt-3">
                Selesai
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  };

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

  const modalClaimReward = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <div>
              <h1 className="font-bold text-center text-secondary">
                Selamat! anda berhasil mendapatkan reward
              </h1>
            </div>
            <hr className="mb-4 mt-2" />
            <p className="text-center">
              Terimakasih atas kontribusi anda dengan tetap konsisten memberikan
              saran demi kemajuan PT Cataler Indonesia
            </p>
            <hr className="mb-2 mt-4" />
            <p className="text-center font-semibold mt-2">
              *Silahkan hubungi atasan untuk mengambil reward!
            </p>
            <div className="px-3">
              <button
                onClick={handleClaimRewardModal}
                className="btn btn-sm btn-primary text-white w-full mt-6">
                Confirm
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
    modalDeleteUser,
    modalAddSuggestion,
    modalStatusDetail,
    modalAddUser,
    modalUserDetail,
    modalClaimReward,
    modalAddAttachment,
    modalAttachmentDetail,
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
