import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../auth/Auth";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    didRedirect: false,
  });

  const {
    first_name,
    last_name,
    email,
    password,
    error,
    success,
    didRedirect,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signup({ first_name, last_name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            success: true,
            error: false,
            didRedirect: true,
          });
        }
      })
      .catch((err) => console.log("unable to signup"));
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
        successfully created the user..!!
      </div>
    );
  };

  const myFunction = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const Signupform = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            onChange={handleChange("first_name")}
            autoFocus
            value={first_name}
            className="form-control"
            placeholder="Enter First Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChange("last_name")}
            value={last_name}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
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
          Already a member?
          <Link to="/signin"> Login here</Link>
        </p>
        <div className="row justify-content-md-center">
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/signin" />;
    }
  };

  return (
    <Base>
      <div className="container my-5 py-5">
        <div className="row justify-content-md-center">
          <div className="col-4">
            {Signupform()}
            {errorMessage()}
            {successMessage()}
            {performRedirect()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Signup;
