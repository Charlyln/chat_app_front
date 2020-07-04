import React from "react";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Wall from "./components/App/Wall";
import SignUp from "./components/Signup/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/wall" component={Wall} />
        {/* <Route path="/posts" component={Posts} /> */}
        {/* <Route path="/tableScore" component={TableScore} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
