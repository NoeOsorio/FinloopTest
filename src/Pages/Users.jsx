import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getUsers } from "../Services/auth.service";
import "../Styles/Users.scss";
import Error from "./Error";

export default function Users() {
  const [users, setusers] = useState([]);

  let listUsers = () => {
    return users.map((user, index) => {
      return (
        <div className="user" key={index}>
          <strong className="username">{user.username}</strong>
          <br></br>
          <span >{user.email}</span>
        </div>
      );
    });
  };

  useEffect(() => {
    async function loadUsers() {
      let res = await getUsers(localStorage.getItem("token"));
      if (res) {
        console.log(res.data);
        setusers(res.data.users);
      } else {
        console.error("Algo salio mal");
      }
    }
    if (localStorage.getItem("token")) {
      loadUsers();
    }
  }, []);
  return (
    !localStorage.getItem("token")
? <Error></Error> :
    <div className="container">
      <p className="greetings">
        <span>Welcome User: </span>
        <strong> {localStorage.getItem("id")}</strong>
      </p>
      <h1>Users</h1>
      <div className="users">{listUsers()}</div>
    </div>
  );
}
