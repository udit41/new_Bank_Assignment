import React, { useState } from "react";
import { authenticate, isAuthenticated, signin } from "../auth/Auth";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: false,
    error: false,
    didirect: false,
  });

  const { email, password, error, didRedirect, success } = values;

  const { user } = isAuthenticated();

  const myFunction = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const Signinform = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="email"
            autoFocus
            className="form-control"
            onChange={handleChange("email")}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
            placeholder="Enter Password"
            id="myInput"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="showpassword"
            onClick={myFunction}
          />
          <label className="form-check-label" htmlFor="showpassword">
            Show Password
          </label>
        </div>
        <p className="none-2">
          Don't have an account?
          <Link to="/signup">Register here</Link>
        </p>
        <div className="row justify-content-md-center">
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-5"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-5"
        style={{ display: success ? "" : "none" }}
      >
        successfull..!
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === "banker") {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true, success: true });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: event.target.value,
    });
  };

  return (
    <Base>
      <div className="container">
        <div className="row justify-content-md-center p-5 m-5">
          <div className="col-4">
            {Signinform()}
            {errorMessage()}
            {successMessage()}
            {performRedirect()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Signin;
