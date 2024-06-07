import { useAllStateContext } from "@/context/AllStateContext";
import { useSessionContext } from "@/context/SessionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import AdminDashboardInfo from "@/views/AdminDashboardContentView/AdminDashboardInfo/Index";
import AdminUserManagement from "@/views/AdminDashboardContentView/AdminUserManagementView";
import AdminSideBar from "@/views/AdminDashboardContentView/SideBar";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminSuggestionView from "@/views/AdminDashboardContentView/AdminSuggestionView";

const AdminDashboard = () => {
  const router = useRouter();
  const { session } = useSessionContext();
  const { getAllSuggestion } = useSuggestionDataContext();
  const { isUserManageBtnActive, isDashboardBtnActive } = useAllStateContext();

  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
      router.push("/");
    } else if (
      session &&
      (session?.user.role !== "Admin") & (session?.user.role !== "Section Head")
    ) {
      router.push("/dashboard/user");
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    getAllSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="container flex min-w-full">
      <AdminSideBar />
      <div className="w-full">
        {isUserManageBtnActive ? (
          <AdminUserManagement />
        ) : isDashboardBtnActive ? (
          <AdminDashboardInfo />
        ) : (
          <AdminSuggestionView />
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
