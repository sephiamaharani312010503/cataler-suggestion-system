import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { useSessionContext } from "@/context/SessionContext";
import UserDashboardLayout from "@/components/Layout/UserDashboardLayout";
import UserDashboardProfileContainer from "@/components/Layout/UserDashboardLayout/UserProfileContainer";
import UserBiodataWrapper from "@/components/Layout/UserDashboardLayout/UserBiodataWrapper";
import ProfileImage from "@/views/UserProfileView/ProfileImage";
import UserProfile from "@/views/UserProfileView";
import AddSuggestionForm from "@/views/AddSuggestionForm";
import AllSuggestion from "@/views/AllSuggestionView";

const UserDashboard = () => {
  const router = useRouter();
  const { getAllSuggestion } =
    useSuggestionDataContext();
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
      <div className="hidden md:flex ">
        <AddSuggestionForm />
        <div className="hidden md:flex md:flex-col md:w-2/3">
          <UserDashboardLayout
            content={
              <UserDashboardProfileContainer
                content={
                  <>
                    <ProfileImage />
                    <UserBiodataWrapper
                      content={<UserProfile />}
                    />
                  </>
                }
              />
            }
          />
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
