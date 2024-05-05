import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSessionContext } from "@/context/SessionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserProfile from "@/views/UserProfileView";
import ProfileImage from "@/views/UserProfileView/ProfileImage";

const AdminDashboard = () => {
  const router = useRouter();

  const {
    getAllSuggestion,
    getSuggestionById,
    handleAddSuggestionModal,
  } = useSuggestionDataContext();

  const { session, userRole } =
    useSessionContext();

  const {
    allSuggestion,
    isModalAddSuggestionOpen,
    isModalSuggestionDeleteOpen,
    isModalSuggestionDetailOpen,
  } = useAllStateContext();

  const {
    modalSuggestionDetail,
    modalDeleteSuggestion,
    modalAddSuggestion,
  } = useModalFunctionContext();

  const checkAuth = async () => {
    if (userRole !== "admin") {
      router.push("/");
    } else {
      getAllSuggestion();
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="drawer md:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        <div className="pe-4 md:pe-8 mb-3">
          <div className="container mt-1 ms-2 p-3 border-2 border-gray-300 bg-gray-50 shadow-lg shadow-gray-400/60 rounded-lg">
            <div className="flex items-center justify-between ms-1 mb-2">
              <p className="font-bold mb-2">
                Semua Saran
              </p>
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
                {allSuggestion.map(
                  (item, index) => (
                    <tr
                      onClick={() =>
                        getSuggestionById(item.id)
                      }
                      key={item.id}
                      className="cursor-pointer">
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        {format(
                          new Date(
                            item.time.seconds *
                              1000
                          ),
                          "dd/MM/yyyy"
                        )}
                      </td>
                      <td></td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {isModalSuggestionDetailOpen &&
              modalSuggestionDetail()}
            {isModalSuggestionDeleteOpen &&
              modalDeleteSuggestion()}
            {isModalAddSuggestionOpen &&
              modalAddSuggestion()}
          </div>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div>
            <ProfileImage />
            <UserProfile />
          </div>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdminDashboard;
