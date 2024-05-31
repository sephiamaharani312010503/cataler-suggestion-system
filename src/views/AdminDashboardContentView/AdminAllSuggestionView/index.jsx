import AdminContentLayout from "@/components/Layout/AdminDashboardLayout";
import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { faCaretDown, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import AdminAccSuggestion from "../AdminAccSuggestionView";
import AdminDisapproveSuggestionView from "../AdminDisapproveSuggestionView";
import Link from "next/link";

const AdminAllSuggestion = () => {
  const {
    allSuggestion,
    isModalAdminSuggestionDetailOpen,
    isModalSuggestionDeleteOpen,
    setIsModalAdminSuggestionDetailOpen,
    isModalStatusDetailOpen,
    isSuggestionAccView,
    setIsSuggestionAccView,
    isSuggestionAllView,
    setIsSuggestionAllView,
    isSuggestionDisapproveView,
    setIsSuggestionDisapproveView,
  } = useAllStateContext();
  const { getSuggestionById } = useSuggestionDataContext();
  const {
    modalDeleteSuggestion,
    modalAdminSuggestionDetail,
    modalStatusDetail,
  } = useModalFunctionContext();

  const handleAllSuggestionView = () => {
    setIsSuggestionAllView(true);
    setIsSuggestionAccView(false);
    setIsSuggestionDisapproveView(false);
  };

  const handleAccSuggestionView = () => {
    setIsSuggestionAllView(false);
    setIsSuggestionAccView(true);
    setIsSuggestionDisapproveView(false);
  };

  const handleDisapproveSuggestionView = () => {
    setIsSuggestionAllView(false);
    setIsSuggestionAccView(false);
    setIsSuggestionDisapproveView(true);
  };

  return (
    <AdminContentLayout
      content={
        <>
          <div className="container border rounded min-h-screen px-2">
            <div className="mt-3">
              <div className="flex items-center justify-between ms-2 mb-2">
                <p className="font-bold">Kelola Saran</p>
                <details className="dropdown dropdown-left me-6">
                  <summary className="btn btn-sm btn-outline">
                    Status
                    <FontAwesomeIcon icon={faCaretDown} />
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li
                      onClick={handleAllSuggestionView}
                      className="cursor-pointer font-semibold hover:bg-gray-300 hover:rounded py-1 px-2 me-3">
                      Semua Saran
                    </li>
                    <li
                      onClick={handleAccSuggestionView}
                      className="cursor-pointer font-semibold hover:bg-gray-300 hover:rounded py-1 px-2 me-3">
                      ACC
                    </li>
                    <li
                      onClick={handleDisapproveSuggestionView}
                      className="cursor-pointer font-semibold  hover:bg-gray-300 hover:rounded py-1 px-2 me-3">
                      Disapprove
                    </li>
                  </ul>
                </details>
              </div>
              <hr />
              {isSuggestionAllView ? (
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
                        <td className="text-center ">{index + 1}</td>
                        <td>{item.userNik}</td>
                        <td>{item.userName}</td>
                        <td>{item.title}</td>
                        <td className="text-center ">
                          {format(new Date(item.date), "dd/MM/yyyy")}
                        </td>
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
                        <td className="text-center">
                          <button
                            onClick={() => {
                              setIsModalAdminSuggestionDetailOpen(true);
                              getSuggestionById(item.id);
                            }}
                            className="btn btn-sm">
                            <FontAwesomeIcon icon={faUserPen} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : isSuggestionAccView ? (
                <AdminAccSuggestion />
              ) : (
                <AdminDisapproveSuggestionView />
              )}

              {isModalAdminSuggestionDetailOpen && modalAdminSuggestionDetail()}
              {isModalSuggestionDeleteOpen && modalDeleteSuggestion()}
              {isModalStatusDetailOpen && modalStatusDetail()}
            </div>
          </div>
        </>
      }
    />
  );
};
export default AdminAllSuggestion;
