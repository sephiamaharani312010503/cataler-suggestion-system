import { useSessionContext } from "@/context/SessionContext";
import Image from "next/image";
import AddSuggestionFormMobileView from "../addSuggestionFormMobileView.jsx";

const UserProfile = () => {
  const { userName, userNik, userDepartemen, userJabatan } =
    useSessionContext();

  return (
    <div className="pe-4">
      <div className="container flex items-center px-2 pb-2 pt-1 rounded-lg border-2 border-gray-300 shadow-md mt-2 ms-2">
        <div className="mt-1">
          <Image
            src="/static/assets/avatar.png"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        <div className="w-full px-3 ms-2 md:w-1/3">
          <div className="flex justify-between py-2">
            <p className="text-cyan-700 text-sm font-bold">{userName}</p>
            <hr />
            <p className="text-cyan-700 text-sm font-bold">{userNik}</p>
          </div>
          <hr />
          <div className="flex justify-between py-2">
            <p className="text-emerald-700 text-sm font-bold">{userJabatan}</p>
            <p className="text-emerald-700 text-sm font-bold">
              {userDepartemen}
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
