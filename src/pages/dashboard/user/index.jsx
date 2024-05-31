import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { useSessionContext } from "@/context/SessionContext";
import ProfileImage from "@/views/UserProfileView/ProfileImage";
import UserProfile from "@/views/UserProfileView";
import AddSuggestionForm from "@/views/AddSuggestionForm";
import AllSuggestion from "@/views/AllSuggestionView";
import UserStats from "@/views/UserStats";

const UserDashboard = () => {
  const router = useRouter();
  const { session, userNik } = useSessionContext();
  const { getSuggestionByUserName } = useSuggestionDataContext();

  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    getSuggestionByUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNik]);

  return (
    <div>
      <div className="hidden md:flex ">
        <AddSuggestionForm />
        <div className="hidden md:flex md:flex-col md:w-2/3">
          <div className="pt-2 pe-8">
            <div className="flex justify-between w-full px-2 pb-2 pt-1 border-2 border-gray-300 rounded-lg bg-gray-100 shadow-md md:mt-2 ms-2">
              <div className="flex items-center">
                <ProfileImage />
                <UserProfile />
              </div>
              <UserStats />
            </div>
          </div>
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
