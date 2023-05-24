import "./LoginPage.css";
import LoginForm from "./LoginForm/LoginForm";
import CreateAccountForm from "./CreateAccountForm/CreateAccountForm";

import { useState } from "react";

const LoginPage = (props) => {
  const [userHasAccount, setUserHasAccount] = useState(true);

  const switchForm = () => {
    setUserHasAccount(!userHasAccount);
  };

  return (
    <div className="wholeLoginPage">
      <button className="loginPageContainer">
        <div className="textWelcome">Welcome to Apollo</div>
        {userHasAccount ? (
          <LoginForm
            attemptLogin={props.attemptLogin}
            lowerButtonOnClick={switchForm}
          ></LoginForm>
        ) : (
          <CreateAccountForm
            lowerButtonOnClick={switchForm}
          ></CreateAccountForm>
        )}
      </button>
    </div>
  );
};

export default LoginPage;
