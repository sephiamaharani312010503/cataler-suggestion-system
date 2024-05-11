import { useSessionContext } from "@/context/SessionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import AdminAllSuggestion from "@/views/AdminDashboardContentView/AdminAllSuggestionView";
import AdminSideBar from "@/views/AdminDashboardContentView/SideBar";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { session } = useSessionContext();
  const { getAllSuggestion } = useSuggestionDataContext();

  useEffect(() => {
    getAllSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="container flex min-w-full">
      <AdminSideBar />
      <AdminAllSuggestion />
    </div>
  );
};
export default AdminDashboard;
