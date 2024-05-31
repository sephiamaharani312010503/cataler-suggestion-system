import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import TotalSuggestionChart from "./Charts/TotalSuggestionChart";
import GlobalStats from "./GlobalStats";
import { useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { useUserDataContext } from "@/context/UserDataContext";
import TotalAccChart from "./Charts/TotallAccChart";
import { useAllStateContext } from "@/context/AllStateContext";
import AdminSuggestionView from "../AdminSuggestionView";
import AdminUserManagement from "../AdminUserManagementView";

const AdminDashboardInfo = () => {
  const { session } = useSessionContext();
  const { getAllSuggestion } = useSuggestionDataContext();
  const { getAllUserData } = useUserDataContext();
  const { isStatClicked, isStatUserClicked } = useAllStateContext();

  useEffect(() => {
    getAllUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    getAllSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      {isStatClicked ? (
        <AdminSuggestionView />
      ) : isStatUserClicked ? (
        <AdminUserManagement />
      ) : (
        ""
      )}

      <div
        className={`${
          isStatClicked ? "hidden" : isStatUserClicked ? "hidden" : ""
        }`}>
        <GlobalStats />
        <div className="flex">
          <TotalSuggestionChart />
          <TotalAccChart />
        </div>
      </div>
    </>
  );
};
export default AdminDashboardInfo;
