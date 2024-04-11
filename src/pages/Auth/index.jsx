import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, myToast } from "../../components/utils";
import { Input, InputPassword, Button } from "../../components/common";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });
      myToast(data.msg, "success");
      localStorage.setItem("doclink-token", data.result.token);
      localStorage.setItem("doclink-refresh-token", data.result.refreshToken);
      navigate("/");
    } catch (err) {
      myToast(err.response.data.error, "failure");
    }
  };

  return (
    <div className="w-screen h-screen grid place-content-center bg-lightgrey">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="flex flex-col gap-4 max-w-96 bg-white border-grey border p-6 rounded-xl"
      >
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" className="mb-4" />
          <p className="text-black">
            Welcome back! Please login to your account.
          </p>
        </div>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputPassword
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default Auth;
