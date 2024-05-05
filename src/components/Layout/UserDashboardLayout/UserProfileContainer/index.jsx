const UserDashboardProfileContainer = (props) => {
  return (
    <div className="container flex items-center px-2 pb-2 pt-1 border-2 border-gray-300 rounded-lg bg-gray-100 shadow-md md:mt-2 ms-2">
      {props.content}
    </div>
  );
};
export default UserDashboardProfileContainer;
