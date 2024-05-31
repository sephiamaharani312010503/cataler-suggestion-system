import AdminContentLayout from "@/components/Layout/AdminDashboardLayout";
import { useAllStateContext } from "@/context/AllStateContext";
import { useModalFunctionContext } from "@/context/ModalFunctionContext";
import { useSessionContext } from "@/context/SessionContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const AdminUserManagement = () => {
  const { session } = useSessionContext();
  const { setUserPoint } = useSuggestionDataContext();
  const { getAllUserData, getUserById } = useUserDataContext();
  const {
    allUserData,
    setIsModalAddUserOpen,
    isModalAddUserOpen,
    isModalUserDetailOpen,
    setIsModalUserDetailOpen,
    isModalUserDeleteOpen,
  } = useAllStateContext();
  const { modalAddUser, modalUserDetail, modalDeleteUser } =
    useModalFunctionContext();

  useEffect(() => {
    getAllUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    setUserPoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <AdminContentLayout
      content={
        <div className="container border rounded px-2">
          <div className="flex items-center justify-between mt-3 mb-2 ms-2">
            <p className="font-bold">Kelola User</p>
            <button
              onClick={() => setIsModalAddUserOpen(true)}
              className="btn btn-sm btn-secondary text-white">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Tambah User</span>
            </button>
          </div>
          <hr />
          <table className="table mt-1">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th>Nama</th>
                <th>NIK</th>
                <th>Departemen</th>
                <th>Jabatan</th>
                <th className="text-center">Point</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUserData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="text-center ">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.nik}</td>
                  <td>{item.departemen}</td>
                  <td>{item.jabatan}</td>
                  <td className="text-center">{item.point}</td>
                  <td>{item.role}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setIsModalUserDetailOpen(true);
                        getUserById(item.id);
                      }}
                      className="btn btn-sm">
                      <FontAwesomeIcon icon={faUserPen} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalAddUserOpen && modalAddUser()}
          {isModalUserDetailOpen && modalUserDetail()}
          {isModalUserDeleteOpen && modalDeleteUser()}
        </div>
      }
    />
  );
};

export default AdminUserManagement;
