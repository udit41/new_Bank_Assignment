import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/Auth";
import Base from "../core/Base";
import { getAllUser } from "./helper/coreapicall";

const Admindashboard = () => {
  const [users, setUsers] = useState("");
  const [error, setError] = useState("");

  const { user } = isAuthenticated();

  const getUsers = (userId, token) => {
    getAllUser(userId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    const { user, token } = isAuthenticated();
    var userId = user.id;
    getUsers(userId, token);
  }, []);

  return (
    <Base>
      <div className="jumbotron">
        <h3 className="display-4">
          Hello, {user.first_name && user.first_name}!
        </h3>
        <hr className="my-4" />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">email</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link to={`/getUserTrans/${user.id}`}>
                        {user.first_name}
                      </Link>
                    </td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.balance}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default Admindashboard;
