import { useAllStateContext } from "@/context/AllStateContext";
import { useSessionContext } from "@/context/SessionContext";
import ProfileImage from "@/views/UserProfileView/ProfileImage";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faListCheck,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminSideBar = () => {
  const { userName } = useSessionContext();
  const {
    setIsUserManageBtnActive,
    setIsSuggestionManageBtnActive,
    isSuggestionManageBtnActive,
    isUserManageBtnActive,
    setIsDashboardBtnActive,
    isDashboardBtnActive,
  } = useAllStateContext();

  const handleUserManageBtn = () => {
    setIsUserManageBtnActive(true);
    setIsSuggestionManageBtnActive(false);
    setIsDashboardBtnActive(false);
  };

  const handleSuggestionManageBtn = () => {
    setIsSuggestionManageBtnActive(true);
    setIsUserManageBtnActive(false);
    setIsDashboardBtnActive(false);
  };

  const handleDashboardBtn = () => {
    setIsDashboardBtnActive(true);
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
          <div className="flex items-center mt-2 mx-1">
            <p className="w-full text-secondary font-bold">
              <span>{userName}</span>
            </p>
            <div className="badge badge-primary badge-outline font-semibold">
              Admin
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
        </div>
      </div>
    </div>
  );
};
export default AdminSideBar;
