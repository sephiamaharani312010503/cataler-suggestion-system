import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSessionContext } from "@/context/SessionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { useEffect } from "react";

const UserStats = () => {
  const { userNik } = useSessionContext();
  const { getUserByNik } = useUserDataContext();
  const { userPoint, isModalClaimRewardOpen } = useAllStateContext();
  const { handleClaimRewardModal } = useSuggestionDataContext();
  const { modalClaimReward } = useModalFunctionContext();

  useEffect(() => {
    getUserByNik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNik]);

  return (
    <div className="flex justify-center w-64 bg-white border border-blue-500 rounded-lg p-2 divide-x divide-blue-500">
      <div className="px-3">
        <p className="font-semibold text-sm">Total Point :</p>
        <div className="stat-value">{userPoint ? userPoint : 0}</div>
      </div>
      <div className="flex items-center px-1">
        <button
          onClick={handleClaimRewardModal}
          className="btn btn-secondary ms-2"
          disabled={userPoint < 100}>
          Claim Reward
        </button>
      </div>
      {isModalClaimRewardOpen && modalClaimReward()}
    </div>
  );
};

export default UserStats;
