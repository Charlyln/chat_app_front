import React from "react";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./components/Signup/SignUp";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Messenger from "./components/Messenger";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/posts" component={Posts} />
        <Route path="/users" component={Users} />
        <Route path="/messenger" component={Messenger} />
      </Switch>
    </BrowserRouter>
  );
};

export default MyRouter;
