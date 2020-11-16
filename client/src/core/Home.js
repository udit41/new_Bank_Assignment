import React, { useEffect, useState } from "react";
import Base from "./Base";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Profile from "./Profile";
import { isAuthenticated } from "../auth/Auth";
import { getUserBalance } from "./helper/coreapicalls";

const Home = () => {
  const [balance, setBalance] = useState();

  const [reload, setReload] = useState(false);

  if (isAuthenticated()) {
    const { user } = isAuthenticated();
    var userName = user.first_name ? user.first_name : "undefined";
    var profileLogo = user.first_name.charAt(0).toUpperCase()
      ? user.first_name.charAt(0).toUpperCase()
      : "Null";
    var userId = user.id;
  }

  const getBalance = (userId, token) => {
    getUserBalance(userId, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBalance(data[0].balance);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const { user, token } = isAuthenticated();
    const userId = user.id;
    getBalance(userId, token);
  }, [reload]);

  return (
    <Base>
      <div className="container p-5">
        <Profile
          userName={userName}
          balance={balance}
          userId={userId}
          setReload={setReload}
        ></Profile>
      </div>
    </Base>
  );
};

export default Home;
