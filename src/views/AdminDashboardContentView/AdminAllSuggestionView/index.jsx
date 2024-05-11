import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { faStar, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

const AdminAllSuggestion = () => {
  const {
    allSuggestion,
    isModalAdminSuggestionDetailOpen,
    isModalSuggestionDeleteOpen,
    setIsModalAdminSuggestionDetailOpen,
  } = useAllStateContext();
  const { getSuggestionById } = useSuggestionDataContext();
  const { modalDeleteSuggestion, modalAdminSuggestionDetail } =
    useModalFunctionContext();

  return (
    <div className="w-full pe-3 mt-1">
      <div className="container mt-1 ms-2 p-3">
        <div className="flex items-center justify-between ms-1 mb-2">
          <p className="font-bold mb-2">Semua Saran</p>
        </div>
        <hr />
        <table className="table mt-1">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th>NIK</th>
              <th>Nama</th>
              <th>Judul</th>
              <th className="text-center">Tanggal</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allSuggestion.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td
                  onClick={() => {
                    setIsModalAdminSuggestionDetailOpen(true);
                    getSuggestionById(item.id);
                  }}
                  className="text-center cursor-pointer">
                  {index + 1}
                </td>
                <td
                  onClick={() => {
                    setIsModalAdminSuggestionDetailOpen(true);
                    getSuggestionById(item.id);
                  }}
                  className="cursor-pointer">
                  {item.userNik}
                </td>
                <td
                  onClick={() => {
                    setIsModalAdminSuggestionDetailOpen(true);
                    getSuggestionById(item.id);
                  }}
                  className="cursor-pointer">
                  {item.userName}
                </td>
                <td
                  onClick={() => {
                    setIsModalAdminSuggestionDetailOpen(true);
                    getSuggestionById(item.id);
                  }}
                  className="cursor-pointer">
                  {item.title}
                </td>
                <td
                  onClick={() => {
                    setIsModalAdminSuggestionDetailOpen(true);
                    getSuggestionById(item.id);
                  }}
                  className="text-center cursor-pointer">
                  {format(new Date(item.time.seconds * 1000), "dd/MM/yyyy")}
                </td>
                <td
                  onClick={() => {
                    setIsModalAdminSuggestionDetailOpen(true);
                    getSuggestionById(item.id);
                  }}
                  className="text-center cursor-pointer">
                  {item.status}
                </td>
                <td className="text-center">
                  <button className="btn btn-sm">
                    <FontAwesomeIcon icon={faUserPen} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalAdminSuggestionDetailOpen && modalAdminSuggestionDetail()}
        {isModalSuggestionDeleteOpen && modalDeleteSuggestion()}
      </div>
    </div>
  );
};
export default AdminAllSuggestion;
