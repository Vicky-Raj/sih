import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Admin from "./components/admin/admin"
import Driver from "./components/driver/driver"

export default ()=>(
  <Router>
    <Switch>
      <Route  path="/admin"> 
        <Admin/>
      </Route>
      <Route  path="/driver"> 
        <Driver/>
      </Route>
    </Switch>
  </Router>
);