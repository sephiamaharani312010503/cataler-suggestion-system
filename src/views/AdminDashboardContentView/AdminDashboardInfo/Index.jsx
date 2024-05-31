import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import TotalSuggestionChart from "./Charts/TotalSuggestionChart";
import GlobalStats from "./GlobalStats";
import { useEffect } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { useUserDataContext } from "@/context/UserDataContext";
import TotalAccChart from "./Charts/TotallAccChart";

const AdminDashboardInfo = () => {
  const { session } = useSessionContext();
  const { getAllSuggestion } = useSuggestionDataContext();
  const { getAllUserData } = useUserDataContext();

  useEffect(() => {
    getAllUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    getAllSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return (
    <div>
      <GlobalStats />
      <div className="flex">
        <TotalSuggestionChart />
        <TotalAccChart />
      </div>
    </div>
  );
};
export default AdminDashboardInfo;
