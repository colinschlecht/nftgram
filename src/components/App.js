import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import UserCreate from "./user/UserCreate";
import UserDelete from "./user/UserDelete";
import UserEdit from "./user/UserEdit";
import Profile from "./user/Profile";
import Nav from "./header/Nav";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account/new" exact component={UserCreate} />
            <Route path="/account/edit/:id" exact component={UserEdit} />
            <Route path="/account/delete/:id" exact component={UserDelete} />
            <Route path="/account/:id" exact component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
