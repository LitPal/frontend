import { useState } from "react";
import { hostURL } from "../../../constants";

import axios from "axios";

import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const inputStyle =
    "text-md w-1/2 m-1 p-2 border border-gray-100 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white";
  const statusTagStyle = `text-lg bg-red-400 rounded-lg p-2 mt-10 text-white ${
    status.length > 0 ? "block" : "hidden"
  }`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Authenticating...");
    let response;
    try {
      response = await axios.post(`${hostURL}/login`, {
        username: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
      setStatus("Error connecting to server. Try again later.");
      return;
    }

    if (response.data.status === "user-not-found") {
      setStatus("User not found, please check username");
    } else if (response.data.status === "wrong-password") {
      setStatus("Incorrect Password");
    } else if (response.data.status === "authorized") {
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: email },
      });
      navigate("/");
    }

    // if response.data
    // Reset the form
    setPassword("");
  };

  return (
    <div className="font-sans flex items-center justify-center h-screen">
      <form
        className="shadow-lg rounded-lg bg-white-300 p-4 border border-gray-200 rounded-lg w-1/2 h-1/2 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl mb-8 ">Sign in</h2>
        <div className="w-full flex justify-center">
          <input
            className={inputStyle}
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Username"
          />
        </div>
        <div className="w-full flex justify-center">
          <input
            className={inputStyle}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <button
          className="bg-amber-900 rounded-lg p-2 mt-4 w-1/2 text-white"
          type="submit"
        >
          Login
        </button>

        <p className={statusTagStyle}>{status}</p>
      </form>
    </div>
  );
}

export default LoginPage;
