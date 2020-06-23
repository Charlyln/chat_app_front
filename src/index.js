import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Wall from "./components/App/Wall";
import MyAppBar from "./components/AppBar/MyAppBar";
import SignUp from "./components/Signup/SignUp";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <MyAppBar />
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route path="/wall" component={Wall} />
          {/* <Route path="/posts" component={Posts} /> */}
          {/* <Route path="/tableScore" component={TableScore} /> */}
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
