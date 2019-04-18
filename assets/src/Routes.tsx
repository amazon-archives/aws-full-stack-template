import React from "react";
import { Route, Switch } from "react-router-dom";
import PropsRoute from "./common/PropsRoute";
import Home from "./modules/signup/Home";
import Login from "./modules/signup/Login";
import Signup from "./modules/signup/Signup";
import AddEditGoal from "./modules/goal/AddEditGoal";
import NotFound from "./modules/notFound/NotFound";

interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.SFC<RouteProps> = (childProps) =>
  <Switch>
    <PropsRoute path="/" exact component={Home} props={childProps} />
    <PropsRoute path="/login" exact component={Login} props={childProps} />
    <PropsRoute path="/signup" exact component={Signup} props={childProps} />
    <Route path="/goal/:id?" exact component={AddEditGoal} props={childProps} />
    <Route component={NotFound} />
  </Switch>;