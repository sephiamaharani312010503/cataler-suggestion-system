import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

const AllSuggestion = () => {
  const {
    allSuggestion,
    isModalSuggestionDetailOpen,
    isModalSuggestionDeleteOpen,
    isModalAddSuggestionOpen,
  } = useAllStateContext();

  const { modalSuggestionDetail, modalDeleteSuggestion, modalAddSuggestion } =
    useModalFunctionContext();

  const { getSuggestionById, handleAddSuggestionModal } =
    useSuggestionDataContext();

  return (
    <div className="pe-4">
      <div
        style={{ height: "440px" }}
        className="container mt-2 ms-2 p-3 border-2 border-gray-300 shadow-lg shadow-gray-400/60 rounded-lg">
        <div className="flex items-center justify-between ms-1 mb-2">
          <p className="font-bold mb-2">Saran Anda</p>
          <button
            onClick={handleAddSuggestionModal}
            className="btn btn-sm btn-primary text-white md:hidden">
            <FontAwesomeIcon icon={faPlus} />
            Tambah
          </button>
        </div>
        <hr />
        <table className="table mt-1">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allSuggestion.map((item, index) => (
              <tr
                onClick={() => getSuggestionById(item.id)}
                key={item.id}
                className="cursor-pointer">
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  {format(new Date(item.time.seconds * 1000), "dd/MM/yyyy")}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalSuggestionDetailOpen && modalSuggestionDetail()}
        {isModalSuggestionDeleteOpen && modalDeleteSuggestion()}
        {isModalAddSuggestionOpen && modalAddSuggestion()}
      </div>
    </div>
  );
};
export default AllSuggestion;
