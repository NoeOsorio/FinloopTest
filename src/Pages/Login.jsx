import React, { useState } from "react";
import { signup, login } from "../Services/auth.service";
import { Link, Redirect, useHistory } from "react-router-dom";
import "../Styles/Login.scss";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const [emailError, setemailError] = useState(false);
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
    let valid = false;
    console.log(credentials);
    Object.keys(credentials).forEach((key) => {
      validate(key, credentials[key]);
    });
    console.log(isValid);
    login(credentials).then((res) => {
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

  let validate = (key, value) => {
    console.log(key);
    // inputValidator(key, value);
    switch (key) {
      case "email":
        return emailValidation(value);
      case "password":
        return passwordValidator(value);
      default:
        return false;
    }
  };

  return (
    <div className="container">
      <form>
        <div className="inputs">
          <label htmlFor="email">
            Email
            <input
              className={`${
                emailError
                  ? validator.error
                  : credentials["email"]
                  ? validator.valid
                  : ""
              }`}
              placeholder="contact@example.com"
              id="email"
              type="email"
              required
              onChange={onInputChange}
              value={credentials["email"] || ""}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className={`${
                passwordError
                  ? validator.error
                  : credentials["password"]
                  ? validator.valid
                  : ""
              }`}
              id="password"
              type="password"
              required
              onChange={onInputChange}
              value={credentials["password"] || ""}
            />
          </label>
        </div>

        <div className="buttons">
          <button type="button" onClick={onSubmit}>
            Login
          </button>

          <button>
            <Link to="signup"> Crear cuenta</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
