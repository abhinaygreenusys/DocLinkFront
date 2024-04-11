import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PassContext from "../../utils/PassContext";
import myToast from "../../utils/myToast";
import { RiShutDownLine } from "react-icons/ri";

const Header = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(PassContext);
  return (
    <>
      <div className={`header ${isSidebarOpen ? "" : "collapsed"}`}>
        <div
          className="flex gap-2 items-center cursor-pointer py-4"
          onClick={() => {
            setLoggedUser("");
            localStorage.removeItem("applet-token");
            localStorage.removeItem("applet-refresh-token");
            myToast("Logged out successfully", "success");
            navigate("/login");
          }}
        >
          <RiShutDownLine />
          <span>Logout</span>
        </div>
      </div>
    </>
  );
};

export default Header;
