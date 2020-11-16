import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/Auth";

const Navbar = ({ history }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-info"
      style={{ height: "70px" }}
    >
      <div className="container">
        <Link to="/">
          <h3 className="navbar-brand text-white">ABC Bank</h3>
        </Link>
        {isAuthenticated() && (
          <span
            className="float-right btn btn-danger"
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
          </span>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
