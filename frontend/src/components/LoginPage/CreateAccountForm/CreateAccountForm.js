import "./CreateAccountForm.css";
import { useState } from "react";
import axios from "axios";

const CreateAccountForm = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCopy, setPasswordCopy] = useState();
  const [email, setEmail] = useState();

  const verifyForm = () => {
    var response = "";
    const usernameError = "- Username needs to be between 5 and 20 symbols.";
    const emailError = "- You need to use a valid email.";
    const passwordErrorCopy =
      "- Your repeated password does not match the password.";
    const passwordErrorContent =
      "- Password needs to be between 8 and 40 symbols additionally it needs to contain atleast one uppercase letter, one lowercase letter, one symbol and one number.";

    if (!(username.length > 4 && username.length < 21)) {
      response = response + "\n" + usernameError;
    }

    if (
      !(
        email.includes("@gmail.com") ||
        email.includes("@hotmail.com") ||
        email.includes("@yahoo.com") ||
        email.includes("@outlook.com")
      )
    ) {
      response = response + "\n" + emailError;
    }

    if (!(password === passwordCopy)) {
      response = response + "\n" + passwordErrorCopy;
    }

    const passwordPattern =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[0-9A-Za-z!@#$%]{8,20}$/;
    if (!password.match(passwordPattern)) {
      response = response + "\n" + passwordErrorContent;
    }

    if (!(response === "")) {
      alert(response);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (verifyForm()) {
      const newAccountObject = {
        username: username,
        password: password,
        email: email,
        type: "createAccount",
      };
      axios
        .post(
          "http://localhost:8080/Webbapplication/backend/",
          newAccountObject
        )
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
  };

  return (
    <div>
      <button disabled className="wrapperLoginPage">
        <h1 className="createAccountFormTextUpper">Create Account:</h1>
        <form
          onSubmit={handleSubmit}
          className="formCreateAccount"
          name="createAccountForm"
        >
          <input
            className="createUsername"
            placeholder="Username"
            required
            type="text"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className="seperator"></div>
          <input
            className="createEmail"
            placeholder="Email"
            required
            type="text"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="seperator"></div>
          <input
            className="createPassword"
            placeholder="Password"
            required
            type="text"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="seperator"></div>
          <input
            className="createCopyPassword"
            placeholder="Password"
            required
            type="text"
            name="copyPassword"
            onChange={(event) => setPasswordCopy(event.target.value)}
          />
          <div className="seperator"></div>
          <button className="createAccountButton">Create account</button>
          <div className="seperatorBig"></div>
          <div className="createAccountFormTextLower">
            Already have an account?
          </div>
          <div className="seperatorSmall"></div>
          <button onClick={() => props.lowerButtonOnClick()}>Login here</button>
        </form>
      </button>
    </div>
  );
};

export default CreateAccountForm;
