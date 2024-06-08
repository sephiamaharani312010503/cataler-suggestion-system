import AdminContentLayout from "@/components/Layout/AdminDashboardLayout";
import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { faCaretDown, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminAccSuggestion from "./AdminAccSuggestionView";
import AdminDisapproveSuggestionView from "./AdminDisapproveSuggestionView";
import AdminAllSuggestion from "./AdminAllSuggestionView";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";

const AdminSuggestionView = () => {
  const {
    isModalAttachmentDetailOpen,
    isModalAdminSuggestionDetailOpen,
    isModalSuggestionDeleteOpen,
    isModalStatusDetailOpen,
    isSuggestionAccView,
    isSuggestionDisapproveView,
    isStatClicked,
  } = useAllStateContext();
  const {
    modalDeleteSuggestion,
    modalAttachmentDetail,
    modalStatusDetail,
    modalAdminSuggestionDetail,
  } = useModalFunctionContext();
  const {
    handleAccSuggestionView,
    handleAllSuggestionView,
    handleDisapproveSuggestionView,
    resetStatBtn,
  } = useSuggestionDataContext();

  return (
    <AdminContentLayout
      content={
        <>
          <div className="container border rounded min-h-screen px-2">
            <div className="mt-3">
              <div className="flex items-center justify-between ms-2 mb-2">
                {isStatClicked ? (
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={resetStatBtn}>
                    <span>
                      <FontAwesomeIcon icon={faLeftLong} />
                    </span>
                    Dashboard
                  </button>
                ) : (
                  <p className="font-bold">Kelola Saran</p>
                )}

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
              {isSuggestionDisapproveView ? (
                <AdminDisapproveSuggestionView />
              ) : isSuggestionAccView ? (
                <AdminAccSuggestion />
              ) : (
                <AdminAllSuggestion />
              )}
              {isModalAdminSuggestionDetailOpen && modalAdminSuggestionDetail()}
              {isModalAttachmentDetailOpen && modalAttachmentDetail()}
              {isModalSuggestionDeleteOpen && modalDeleteSuggestion()}
              {isModalStatusDetailOpen && modalStatusDetail()}
            </div>
          </div>
        </>
      }
    />
  );
};
export default AdminSuggestionView;
