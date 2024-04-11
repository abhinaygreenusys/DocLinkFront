import axios from "axios";
import { jwtDecode } from "jwt-decode";

const updateToken = async () => {
  const refreshToken = localStorage.getItem("doclink-refresh-token");
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BASE_API_URL}/refreshAccessToken`,
      {
        refreshToken,
      }
    );
    localStorage.setItem("doclink-token", data.result);
    const decodedToken = jwtDecode(data.result);
    console.log("token updated");
    return decodedToken.id;
  } catch (e) {
    console.log(e);
    localStorage.removeItem("doclink-token");
    localStorage.removeItem("doclink-refresh-token");
    return null;
  }
};

export default updateToken;
