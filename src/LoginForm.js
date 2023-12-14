// LoginForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, resetLoginState } from "./api";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, isAuthenticated, info } = useSelector((state) => {
    console.log(state.login);
    return state.login;
  });

  const handleLogin = async () => {
    try {
      await dispatch(resetLoginState());
      await dispatch(loginApi({ email, password }));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome Admin</p>
          <p>ACCESS TOKEN :: {info.token}</p> <p>REFRESH TOKEN :: {info.refresh_token}</p>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            email:
            <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
