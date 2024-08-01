import { useAllStateContext } from "@/context/AllStateContext";
import { useSessionContext } from "@/context/SessionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import ProfileImage from "@/views/UserProfileView/ProfileImage";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faListCheck,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminSideBar = () => {
  const { userName, userRole } = useSessionContext();
  const {
    setIsUserManageBtnActive,
    setIsSuggestionManageBtnActive,
    isSuggestionManageBtnActive,
    isUserManageBtnActive,
    setIsDashboardBtnActive,
    isDashboardBtnActive,
    isReportBtnActive,
    setIsReportBtnActive,
  } = useAllStateContext();

  const { resetStatBtn } = useSuggestionDataContext();

  const handleUserManageBtn = () => {
    resetStatBtn();
    setIsUserManageBtnActive(true);
    setIsSuggestionManageBtnActive(false);
    setIsDashboardBtnActive(false);
    setIsReportBtnActive(false);
  };

  const handleSuggestionManageBtn = () => {
    resetStatBtn();
    setIsSuggestionManageBtnActive(true);
    setIsUserManageBtnActive(false);
    setIsDashboardBtnActive(false);
    setIsReportBtnActive(false);
  };

  const handleDashboardBtn = () => {
    resetStatBtn();
    setIsDashboardBtnActive(true);
    setIsSuggestionManageBtnActive(false);
    setIsUserManageBtnActive(false);
    setIsReportBtnActive(false);
  };

  const handleReportBtn = () => {
    resetStatBtn();
    setIsReportBtnActive(true);
    setIsDashboardBtnActive(false);
    setIsSuggestionManageBtnActive(false);
    setIsUserManageBtnActive(false);
  };

  return (
    <div className="container w-1/4 bg-slate-100 min-h-screen">
      <div className="container px-2 mt-2 mb-1">
        <div className="border rounded bg-white px-1 py-2">
          <div className="flex justify-center">
            <ProfileImage />
          </div>
          <hr className="mt-3" />
          <div className="flex flex-col items-center mt-1 mx-1">
            <div>
              <p className="w-full text-secondary font-bold">
                <span>{userName}</span>
              </p>
            </div>
            <div className="badge badge-primary badge-outline font-semibold mt-2">
              {userRole}
            </div>
          </div>
        </div>
      </div>
      <div className="container px-2 mt-3">
        <div className="border rounded">
          <div
            onClick={handleDashboardBtn}
            className={`w-full px-1 ${
              isDashboardBtnActive ? "bg-gray-300" : ""
            } hover:bg-gray-200 rounded py-2 cursor-pointer font-semibold`}>
            <div className="px-1">
              <FontAwesomeIcon icon={faHouse} />
              <span className="ms-2">Dashboard</span>
            </div>
          </div>
          <hr />
          <div
            onClick={handleSuggestionManageBtn}
            className={`w-full px-1 ${
              isSuggestionManageBtnActive ? "bg-gray-300" : ""
            } hover:bg-gray-200 rounded py-2 cursor-pointer font-semibold`}>
            <div className="px-1">
              <FontAwesomeIcon icon={faListCheck} />
              <span className="ms-2.5">Kelola Saran</span>
            </div>
          </div>
          <hr />
          {userRole == "Section Head" ? (
            ""
          ) : (
            <>
              <div
                onClick={handleUserManageBtn}
                className={`w-full px-1 ${
                  isUserManageBtnActive ? "bg-gray-300" : ""
                } hover:bg-gray-200 rounded py-2 cursor-pointer font-semibold`}>
                <div className="px-1">
                  <FontAwesomeIcon icon={faUsersGear} />
                  <span className="ms-2">Kelola User</span>
                </div>
              </div>
              <hr />
              <div
                onClick={handleReportBtn}
                className={`w-full px-1 ${
                  isReportBtnActive ? "bg-gray-300" : ""
                } hover:bg-gray-200 rounded py-2 cursor-pointer font-semibold`}>
                <div className="px-2">
                  <FontAwesomeIcon icon={faFilePdf} />
                  <span className="ms-2">Laporan</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminSideBar;
