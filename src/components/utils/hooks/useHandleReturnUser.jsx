import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { updateToken } from "../index";

const useHandleReturnUser = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const handleReturningUser = async () => {
    if (localStorage.getItem("doclink-token")) {
      const decodedToken = jwtDecode(localStorage.getItem("doclink-token"));
      if (decodedToken.exp * 1000 < Date.now()) {
        const userId = await updateToken();
        setLoggedUser(userId);
      } else {
        console.log("back user", decodedToken, decodedToken.id);
        setLoggedUser(decodedToken.id);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    handleReturningUser();
  }, []);

  return { loading, loggedUser, setLoggedUser };
};

export default useHandleReturnUser;
