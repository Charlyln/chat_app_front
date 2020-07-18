import React from "react";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Wall from "./components/App/Wall";
import SignUp from "./components/Signup/SignUp";
import Users from "./components/App/Users";
import Posts from "./components/App/Posts";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/wall" component={Posts} />
        <Route path="/users" component={Users} />
        <Route path="/messenger" component={Wall} />
        {/* <Route path="/tableScore" component={TableScore} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
