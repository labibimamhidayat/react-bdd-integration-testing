import Home from 'src/feature/home';
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);

  const onClickLogin = () => {
    if (username === "benar" && password === "benar") {
      setSuccessLogin(true);
      return;
    }
    setShowError(true);
  };

  if (successLogin) return <Home />

  return (
    <div id="loginform">
      <h2 id="headerTitle">Welcome To Test Login Page</h2>
      <div>
        <div className="row">
          <label>Username</label>
          <input
            aria-label="username-input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input
            data-testid="password-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {showError && (
          <div className="row error-info" data-testid="errorInfo">Username Or Password is not match</div>
        )}
        <div id="button" className="row">
          <button onClick={onClickLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
