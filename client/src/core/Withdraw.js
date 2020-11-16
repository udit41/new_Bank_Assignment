import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/Auth";
import Base from "./Base";
import { withdraw } from "./helper/coreapicalls";

const Withdraw = ({ setReload = (f) => f, reload = undefined }) => {
  const { user, token } = isAuthenticated();
  const userId = user.id;

  const [values, setValues] = useState({
    amount: "",
    success: false,
    error: false,
    didredirect: false,
  });

  const { amount, success, error, didredirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    withdraw({ amount }, userId, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            amount: "",
            success: true,
            didredirect: true,
          });
          setReload(!reload);
        }
      })
      .catch((err) => console.log(err));
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

  return (
    <Base>
      <div className="w-50 p-5 center">
        <div class="jumbotron">
          <h4 className="text-center m-3">Enter Amount to Withdraw</h4>
          <input
            type="Number"
            className="form-control"
            value={amount}
            onChange={handleChange("amount")}
            placeholder="Enter Amount"
          />
          <div className="mx-auto w-50 text-center">
            <button className="btn btn-primary m-3" onClick={onSubmit}>
              Withdraw
            </button>
            <Link to="/">
              <a className="btn btn-danger">Back</a>
            </Link>
          </div>
        </div>
        <div className="m-4">
          {errorMessage()}
          {successMessage()}
        </div>
      </div>
    </Base>
  );
};

export default Withdraw;
