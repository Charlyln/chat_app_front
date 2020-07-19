import React from "react";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./components/Signup/SignUp";
import Users from "./components/App/Users";
import Posts from "./components/App/Posts";
import Messenger from "./components/App/Messenger";
import Crash from "./Crash";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        {/* <Route exact path="/" component={Crash} /> */}
        <Route path="/posts" component={Posts} />
        <Route path="/users" component={Users} />
        <Route path="/messenger" component={Messenger} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
