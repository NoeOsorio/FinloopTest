import React, { useState } from "react";
import { signup } from "../Services/auth.service";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [emailError, setemailError] = useState(false);
  const [usernameError, setusernameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [isValid, setisValid] = useState(false);

  let navigator = useHistory();

  const validator = {
    error: "error",
    valid: "valid",
  };

  let cleanData = () => {
    setcredentials({});
  };

  let onSubmit = () => {
    Object.keys(credentials).forEach((key) => {
      validate(key, credentials[key]);
    });
    signup(credentials)
      .then((res) => {
        console.log(res);
        if ((res.status = 200)) {
          cleanData();
          let id = res.data["id"];
          localStorage.setItem("id", res.data["id"]);
          localStorage.setItem("token", res.data["jwt"]);
          alert(`Welcome: ${localStorage.getItem("id")}`);
          navigator.push("/users");
        } else {
          alert(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let onInputChange = (e) => {
    setcredentials({ ...credentials, [e.target.id]: e.target.value.trim() });
    validate(e.target?.id, e.target.value);
  };

  //   Validators
  let emailValidation = (email) => {
    if (!email.trim()) {
      setisValid(passwordError && false);
      setemailError(true);
      return true;
    }
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setisValid(passwordError && true);
      setemailError(false);
      return false;
    } else {
      setisValid(passwordError && false);
      setemailError(true);
      return true;
    }
  };

  let passwordValidator = (value) => {
    if (!value.trim()) {
      setisValid(emailError && false);
      setpasswordError(true);
      return true;
    } else {
      setisValid(emailError && true);
      setpasswordError(false);
      return false;
    }
  };
  let usernameValidator = (value) => {
    if (!value.trim()) {
      setisValid(emailError && false);
      setusernameError(true);
      return true;
    } else {
      setisValid(emailError && true);
      setusernameError(false);
      return false;
    }
  };

  let validate = (key, value) => {
    console.log(key);
    // inputValidator(key, value);
    switch (key) {
      case "email":
        return emailValidation(value);
      case "password":
        return passwordValidator(value);
        case "username":
            return usernameValidator(value);  
      default:
        return false;
    }
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="username">
          Username
          <input
            id="username"
            placeholder="user"
            type="text"
            className={`${
                usernameError
                  ? validator.error
                  : credentials["username"]
                  ? validator.valid
                  : ""
              }`}
            required
            onChange={onInputChange}
            value={credentials["username"] || ""}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            placeholder="contact@example.com"
            className={`${
              emailError
                ? validator.error
                : credentials["email"]
                ? validator.valid
                : ""
            }`}
            required
            onChange={onInputChange}
            value={credentials["email"] || ""}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            required
            onChange={onInputChange}
            className={`${
              passwordError
                ? validator.error
                : credentials["password"]
                ? validator.valid
                : ""
            }`}
            value={credentials["password"] || ""}
          />
        </label>

        <div className="buttons">
          <button type="button" onClick={onSubmit}>
            Registrarme
          </button>

          <button>
            <Link to="login"> Ya tengo cuenta</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
