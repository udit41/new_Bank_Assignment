import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ userName, balance, userId }) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col-6">
          <h1 className="display-4">Hello, {userName && userName}!</h1>
          <p className="lead">
            Welcome to ABC bank, the bank you can believe upon!!
          </p>
        </div>
        <div className="col-6">
          <div className="float-right">
            <p>Your Balance</p>
            <h3>{formatter.format(balance && balance)}</h3>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <div className="mx-auto w-50">
        <button className="btn btn-outline-info btn-lg mr-4">
          <Link to={`/withdraw`}> Withdraw </Link>
        </button>
        <button className="btn btn-outline-info btn-lg mr-4">
          <Link to={`/deposit`}> Deposit </Link>
        </button>
        <button className="btn btn-outline-info btn-lg">
          <Link to={`/viewstatement/${userId}`}>View Statement</Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
