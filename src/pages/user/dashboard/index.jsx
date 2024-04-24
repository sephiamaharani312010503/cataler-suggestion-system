import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import AddSuggestionForm from "./components/addSuggestionForm";
import UserProfile from "./components/userProfile";
import AllSuggestion from "./components/allSuggestion";
import { useSessionContext } from "@/context/SessionContext";
import AddSuggestionFormMobileView from "./components/addSuggestionFormMobileView.jsx";

const UserDashboard = () => {
  const router = useRouter();
  const { getAllSuggestion } = useSuggestionDataContext();
  const { session } = useSessionContext();

  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
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
    <div>
      <div className="hidden md:flex md:h-screen">
        <AddSuggestionForm />
        <div className="hidden md:flex md:flex-col md:w-2/3">
          <UserProfile />
          <AllSuggestion />
        </div>
      </div>
      <div className="container flex flex-col md:hidden">
        <UserProfile />
        <AllSuggestion />
      </div>
    </div>
  );
};

export default UserDashboard;
