import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoutes from "./auth/PrivateRoutes";
import Withdraw from "./core/Withdraw";
import Deposit from "./core/Deposit";
import Viewstatement from "./core/Viewstatement";
import Admindashboard from "./admin/Admindashboard";
import AdminRoutes from "./auth/AdminRoutes";
import Viewaltrans from "./admin/Viewaltrans";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home}></PrivateRoutes>
        <PrivateRoutes
          path="/withdraw"
          exact
          component={Withdraw}
        ></PrivateRoutes>
        <PrivateRoutes
          path="/deposit"
          exact
          component={Deposit}
        ></PrivateRoutes>
        <PrivateRoutes
          path="/viewstatement/:userId"
          exact
          component={Viewstatement}
        ></PrivateRoutes>
        <AdminRoutes
          path="/admin"
          exact
          component={Admindashboard}
        ></AdminRoutes>
        <AdminRoutes
          path="/getUserTrans/:userId"
          exact
          component={Viewaltrans}
        ></AdminRoutes>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
