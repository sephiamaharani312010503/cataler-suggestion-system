import { useAllStateContext } from "@/context/AllStateContext";
import { useSessionContext } from "@/context/SessionContext";

const GlobalStats = () => {
  const {
    allSuggestion,
    allUserData,
    setIsStatClicked,
    setIsStatUserClicked,
    setIsSuggestionAllView,
    setIsSuggestionAccView,
    setIsSuggestionDisapproveView,
    setIsUserManagementView,
  } = useAllStateContext();
  const { userRole } = useSessionContext();
  const suggestionAcc = allSuggestion.filter(
    (suggestion) => suggestion.status === "ACC"
  );

  const suggestionDisapprove = allSuggestion.filter(
    (suggestion) => suggestion.status === "Disapprove"
  );

  return (
    <div className="container flex w-full">
      <div className="container flex items-center justify-center mt-3 px-3">
        <div className="stats shadow border">
          <div
            onClick={() => {
              setIsStatClicked(true);
              setIsSuggestionAllView(true);
            }}
            className="stat place-items-center cursor-pointer hover:shadow hover:shadow-lg hover:shadow-secondary hover:bg-blue-200/10">
            <div className="stat-title text-secondary font-semibold">
              Total Saran Masuk
            </div>
            <div className="stat-value text-secondary">
              {allSuggestion.length}
            </div>
          </div>
          <div
            onClick={() => {
              setIsStatClicked(true);
              setIsSuggestionAccView(true);
            }}
            className="stat place-items-center cursor-pointer hover:shadow hover:shadow-lg hover:shadow-primary hover:bg-emerald-200/10">
            <div className="stat-title text-primary font-semibold">
              Total Saran Disetujui
            </div>
            <div className="stat-value text-primary">
              {suggestionAcc.length}
            </div>
          </div>
          <div
            onClick={() => {
              setIsStatClicked(true);
              setIsSuggestionDisapproveView(true);
            }}
            className="stat place-items-center cursor-pointer hover:shadow hover:shadow-lg hover:shadow-red-300 hover:bg-red-200/10">
            <div className="stat-title text-error font-semibold">
              Total Saran Ditolak
            </div>
            <div className="stat-value text-error">
              {suggestionDisapprove.length}
            </div>
          </div>
          {userRole === "Section Head" ? (
            ""
          ) : (
            <div
              onClick={() => {
                setIsStatUserClicked(true);
                setIsUserManagementView(true);
              }}
              className="stat place-items-center cursor-pointer hover:shadow hover:shadow-lg hover:shadow-violet-300 hover:bg-violet-300/10">
              <div className="stat-title text-violet-700 font-semibold">
                Total User Terdaftar
              </div>
              <div className="stat-value text-violet-700">
                {allUserData.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
