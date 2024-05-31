import { useAllStateContext } from "@/context/AllStateContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import axios from "axios";
const AddSuggestionForm = () => {
  const {
    title,
    currentCondition,
    suggestion,
    setTitle,
    setCurrentCondition,
    setSuggestion,
    category,
    isAddBtnLoading,
    date,
    setDate,
    imageFile,
    setImageFile,
  } = useAllStateContext();
  const { addSuggestion, handleRadioChange } = useSuggestionDataContext();

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

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
              <div className="container flex justify-center w-full border bg-white rounded-lg">
                <div>
                  <label className="label cursor-pointer">
                    <input
                      onChange={() => handleRadioChange("5S")}
                      checked={category === "5S"}
                      type="radio"
                      className="radio checked:bg-green-500 border-2 border-green-700"
                    />
                    <span className="label-text text-emerald-600 font-semibold ms-1">
                      5S
                    </span>
                  </label>
                </div>
                <div>
                  <label className="label cursor-pointer">
                    <input
                      onChange={() => handleRadioChange("Safety")}
                      checked={category === "Safety"}
                      type="radio"
                      className="radio checked:bg-warning ms-3 border-2 border-yellow-500"
                    />
                    <span className="label-text ms-1 text-yellow-500 font-semibold">
                      Safety
                    </span>
                  </label>
                </div>
                <div>
                  <label className="label cursor-pointer">
                    <input
                      onChange={() => handleRadioChange("Improvement")}
                      checked={category === "Improvement"}
                      type="radio"
                      className="radio checked:bg-blue-500 ms-3 border-2 border-blue-700"
                    />
                    <span className="label-text ms-1 text-blue-500 font-semibold">
                      Improvement
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <label className="label text-sm text-gray-600 font-bold">
              Judul :
              <span>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
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
                      <h2 className="card-title">You needed more info?</h2>
                      <p>Here is a description!</p>
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
                    role="button"
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
                      <h2 className="card-title">You needed more info?</h2>
                      <p>Here is a description!</p>
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
                    role="button"
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
                      <h2 className="card-title">You needed more info?</h2>
                      <p>Here is a description!</p>
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
            <label className="label text-sm text-gray-600 font-bold">
              Lampiran :
            </label>
            <div className="flex items-center justify-between mb-2">
              <input
                type="file"
                className="file-input file-input-bordered file-input-sm"
              />
              <button
                type="submit"
                className="btn btn-sm btn-primary text-white"
                disabled={isAddBtnLoading ? true : false}>
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
    </div>
  );
};
export default AddSuggestionForm;
