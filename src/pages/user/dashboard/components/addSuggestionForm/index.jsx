import { useAllStateContext } from "@/context/AllStateContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
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
  } = useAllStateContext();
  const { addSuggestion, handleRadioChange } = useSuggestionDataContext();

  return (
    <div className="container w-full px-2 md:w-1/3 md:ps-2">
      <div
        className="container border-2 border-gray-300 shadow-lg shadow-gray-400/60 rounded-lg p-4 mt-2"
        style={{ height: "548px" }}>
        <p className="text-center font-bold mb-2">Berikan Saran</p>
        <hr />
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
