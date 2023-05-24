import { useState } from "react";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [loginVariable, setLoginVariable] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginObject = {
      loginVariable: loginVariable,
      password: password,
      type: "loginRequest",
    };

    props.attemptLogin(loginObject);
  };

  return (
    <div>
      <button disabled className="wrapperLoginPage">
        <h1 className="loginFormTextUpper">Please login:</h1>
        <div className="seperator"></div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username or email"
            type="text"
            name="emailOrUsername"
            className="loginUsernameOrEmail"
            onChange={(event) => setLoginVariable(event.target.value)}
          />
          <div className="seperator"></div>
          <input
            className="loginPassword"
            placeholder="Password"
            type="text"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="seperator"></div>
          <button className="loginButton">Login</button>
          <div className="seperatorBig"></div>
          <div className="loginFormTextLower">Dont have an account?</div>
          <div className="seperatorSmall"></div>
          <button onClick={() => props.lowerButtonOnClick()}>
            Create here
          </button>
        </form>
      </button>
    </div>
  );
};

export default LoginForm;
