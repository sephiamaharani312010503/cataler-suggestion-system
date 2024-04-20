import Image from "next/image";
import { useAllStateContext } from "@/context/AllStateContext";
import FormSuggestion from "./components/form";

const UserDashboard = () => {
  const { userName, userNik, userDepartemen, userJabatan } =
    useAllStateContext();
  return (
    <div className="flex">
      <div className="container w-1/4 h-screen">
        <div className="container ps-2 py-3">
          <div className="flex items-center justify-center w-full h-36">
            <Image
              src="/static/assets/avatar.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full p-1">
            <div class="grid grid-cols-1 divide-y-2 divide-gray-400">
              <div className="flex py-3">
                <p className="font-bold">{userName}</p>
              </div>
              <div className="flex py-3">
                <p className="font-bold">{userNik}</p>
              </div>
              <div className="flex py-3">
                <p className="font-bold">{userJabatan}</p>
              </div>
              <div className="flex py-3">
                <p className="font-bold">{userDepartemen}</p>
              </div>
              <div class="divide-y divide-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full h-screen bg-teal-100">
        <div className="container p-3">
          <FormSuggestion />
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
