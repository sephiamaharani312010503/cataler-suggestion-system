import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddSuggestionForm = () => {
  const {
    title,
    currentCondition,
    suggestion,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    category,
    setCategory,
    isAddBtnLoading,
    date,
    setDate,
    isModalAttachmentOpen,
    setIsModalAttachmentOpen,
    isImageBeforeUploaded,
  } = useAllStateContext();
  const { addSuggestion, handleRadioChange } = useSuggestionDataContext();
  const { modalAddAttachment } = useModalFunctionContext();

  return (
    <div className="container w-full md:w-1/3 md:ps-6 md:pt-4">
      <div
        className="container bg-gray-100 border-2 border-gray-300 shadow-lg shadow-gray-400/60 rounded-lg p-4"
        style={{ height: "490px" }}>
        <form onSubmit={addSuggestion}>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-bold mb-2">Berikan Saran</p>
            <input
              type="date"
              className="input input-bordered input-sm mb-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <hr />
          <div className="form-control">
            <div className="flex justify-center mt-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full select select-sm select-bordered">
                <option>Pilih Kategori</option>
                <option value="5S">5S</option>
                <option value="Safety">Safety</option>
                <option value="Improvement">Improvement</option>
                <option value="HSE">HSE</option>
                <option value="Quality">Quality</option>
              </select>
            </div>
            <label className="label text-sm text-gray-600 font-bold">
              Judul :
              <span>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="btn btn-circle btn-ghost btn-xs text-info">
                    <svg
                      tabIndex={0}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div
                    type="button"
                    tabIndex={0}
                    className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div tabIndex={0} className="card-body">
                      <p> Berikan Judul Kaizen Anda Secara Singkat!</p>
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-sm input-bordered w-full"
            />
            <label className="label text-sm text-gray-600 font-bold">
              Kondisi Saat ini :
              <span>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="btn btn-circle btn-ghost btn-xs text-info">
                    <svg
                      tabIndex={0}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div
                    tabIndex={0}
                    className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div tabIndex={0} className="card-body">
                      <p>Penjelasan Masalah Kondisi Saat Ini Sebelum Kaizen</p>
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <textarea
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
            <label className="label text-sm text-gray-600 font-bold">
              Saran Yang Diusulkan :
              <span>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="btn btn-circle btn-ghost btn-xs text-info">
                    <svg
                      tabIndex={0}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div
                    tabIndex={0}
                    className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div tabIndex={0} className="card-body">
                      <p>Usulan Perbaikan Kondisi Setelah Perbaikan</p>
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
            <div className="flex items-center justify-between mb-1 mt-4 ms-1">
              <div className="flex items-center">
                <button
                  onClick={() => setIsModalAttachmentOpen(true)}
                  type="button"
                  className="link text-secondary ms-1 me-20">
                  <FontAwesomeIcon icon={faPaperclip} />
                  <span className="ms-1 italic font-semibold">*Lampiran</span>
                  {isImageBeforeUploaded ? (
                    <span className="ms-2 text-green-500">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  ) : (
                    ""
                  )}
                </button>
                {!isImageBeforeUploaded ? (
                  <p className="text-warning text-sm">Upload Foto!</p>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-primary text-white"
                disabled={!isImageBeforeUploaded ? true : false}>
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
      </div>
      {isModalAttachmentOpen && modalAddAttachment()}
    </div>
  );
};
export default AddSuggestionForm;
