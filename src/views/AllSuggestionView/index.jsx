import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

const AllSuggestion = () => {
  const {
    allUserSuggestion,
    isModalSuggestionDetailOpen,
    isModalSuggestionDeleteOpen,
    isModalAddSuggestionOpen,
    setIsModalSuggestionDetailOpen,
    isModalAttachmentDetailOpen,
  } = useAllStateContext();

  const {
    modalSuggestionDetail,
    modalDeleteSuggestion,
    modalAddSuggestion,
    modalAttachmentDetail,
  } = useModalFunctionContext();

  const { getSuggestionById, handleAddSuggestionModal } =
    useSuggestionDataContext();

  return (
    <div className="pe-4 md:pe-8 mb-3">
      <div
        style={{ height: "390px" }}
        className="container mt-1 ms-2 p-3 border-2 border-gray-300 bg-white shadow-lg shadow-gray-400/60 rounded-lg">
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
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {allUserSuggestion.map((item, index) => (
              <tr
                onClick={() => {
                  setIsModalSuggestionDetailOpen(true);
                  getSuggestionById(item.id);
                }}
                key={item.id}
                className="cursor-pointer hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{format(new Date(item.date), "dd/MM/yyyy")}</td>
                <td className="text-center">
                  <div
                    className={`badge ${
                      item.status === "ACC"
                        ? "badge-primary"
                        : item.status === "Disapprove"
                        ? "badge-accent"
                        : "badge-secondary"
                    }`}>
                    {item.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalSuggestionDetailOpen && modalSuggestionDetail()}
        {isModalSuggestionDeleteOpen && modalDeleteSuggestion()}
        {isModalAddSuggestionOpen && modalAddSuggestion()}
        {isModalAttachmentDetailOpen && modalAttachmentDetail()}
      </div>
    </div>
  );
};
export default AllSuggestion;
