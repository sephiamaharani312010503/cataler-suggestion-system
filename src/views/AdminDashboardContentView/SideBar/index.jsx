const AdminSideBar = () => {
  return (
    <div className="container w-1/4 bg-gray-100 min-h-screen">
      <div></div>
      <ul className="px-3 py-2">
        <li className="w-full hover:bg-gray-400 rounded px-2 py-2 cursor-pointer font-semibold">
          Lihat Saran
        </li>
        <hr className="border border-gray-400 mb-3 mt-1" />
        <li className="w-full hover:bg-gray-400 rounded px-2 py-2 cursor-pointer font-semibold">
          Kelola User
        </li>
        <hr className="border border-gray-400 mb-3 mt-1" />
      </ul>
    </div>
  );
};
export default AdminSideBar;
