import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getUsers } from "../Services/auth.service";

export default function Users() {
  const [users, setusers] = useState([]);

  let listUsers = () => {
    return users.map((user, index) => {
      return <div key={index}>{user.username}</div>;
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
    <div>
      <span>Welcome User</span>
      <strong>{localStorage.getItem("id")}</strong>
      {listUsers()}
    </div>
  );
}
