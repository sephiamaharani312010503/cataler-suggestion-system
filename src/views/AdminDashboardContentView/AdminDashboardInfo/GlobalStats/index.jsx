import { useAllStateContext } from "@/context/AllStateContext";

const GlobalStats = () => {
  const { allSuggestion, allUserData } = useAllStateContext();
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
          <div className="stat place-items-center">
            <div className="stat-title text-secondary font-semibold">
              Total Saran Masuk
            </div>
            <div className="stat-value text-secondary">
              {allSuggestion.length}
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title text-primary font-semibold">
              Total Saran Disetujui
            </div>
            <div className="stat-value text-primary">
              {suggestionAcc.length}
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title text-error font-semibold">
              Total Saran Ditolak
            </div>
            <div className="stat-value text-error">
              {suggestionDisapprove.length}
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title text-violet-700 font-semibold">
              Total User Terdaftar
            </div>
            <div className="stat-value text-violet-700">
              {allUserData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
