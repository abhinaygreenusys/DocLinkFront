import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserContext, myToast } from "../../utils";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { FaUserPen, FaLaptopMedical } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { setLoggedUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const data = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      func: () => navigate("/dashboard"),
      globalLink: "/dashboard",
    },
    {
      icon: <FaLaptopMedical />,
      name: "Manage Patients",
      func: () => navigate("/patients/view"),
      globalLink: "/patients",
    },
    {
      icon: <FaUserPen />,
      name: "Edit Profile",
      func: () => navigate("/edit-profile"),
      globalLink: "/edit-profile",
    },
    {
      icon: <RiShutDownLine />,
      name: "Logout",
      func: () => {
        setLoggedUser("");
        localStorage.removeItem("doclink-token");
        localStorage.removeItem("doclink-refresh-token");
        myToast("Logged out successfully", "success");
        navigate("/login");
      },
    },
  ];
  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className="px-6 py-5 flex justify-between">
        <Link to="/" className="flex gap-2 items-center collapse-hide">
          <img src="/logo.png" alt="logo" className="h-12" />
        </Link>
        <div
          className="flex gap-4 cursor-pointer text-xl"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {isSidebarOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </div>
      </div>
      <hr className="mx-5 mb-5 collapse-hide" />
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            className={`sidebar-item cursor-pointer ${
              location.pathname.includes(item.globalLink) ? "active" : ""
            }`}
            onClick={() => {
              item.func();
            }}
          >
            {item.icon}
            <span className="collapse-hide font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
