import { useSessionContext } from "@/context/SessionContext";

const UserProfile = () => {
  const { userName, userNik, userDepartemen, userJabatan } =
    useSessionContext();

  return (
    <>
      <div className="flex flex-col ms-4">
        <div className="flex justify-between py-2">
          <p className="text-cyan-700 text-sm font-bold">{userName}</p>
          <hr />
          <p className="text-cyan-700 text-sm font-bold">{userNik}</p>
        </div>
        <hr />
        <div className="flex justify-between py-2">
          <p className="text-emerald-700 text-sm font-bold">{userJabatan}</p>
          <p className="text-emerald-700 text-sm font-bold ms-5">
            {userDepartemen}
          </p>
        </div>
        <hr />
      </div>
    </>
  );
};
export default UserProfile;
