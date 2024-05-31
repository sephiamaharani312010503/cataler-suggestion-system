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
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-sm input-bordered w-full"
            />
            <label className="label text-sm text-gray-600 font-bold">
              Kondisi Saat ini :
            </label>
            <textarea
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
            <label className="label text-sm text-gray-600 font-bold">
              Saran Yang Diusulkan :
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
