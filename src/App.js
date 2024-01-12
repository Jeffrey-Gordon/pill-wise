import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Example from "./Pages/Example.js";
import DrugDetails from "./Pages/DrugDetails.js";
import Clock from "./Pages/Clock.js";
import Calendar from "./Pages/Calendar.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/example" component={Example} />
            <Route path="/drug/:id" component={DrugDetails} />
            <Route path="/clock" component={Clock} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
