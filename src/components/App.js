import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import UserCreate from "./user/UserCreate";
import UserLogin from "./user/UserLogin";
import UserDelete from "./user/UserDelete";
import UserEdit from "./user/UserEdit";
import Profile from "./user/Profile";
import Nav from "./header/Nav";
import { getUser } from "../actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HEADERS } from "../api";

const App = () => {
  const dispatch = useDispatch();

  //!re-auth on page refresh
  useEffect(() => {
    dispatch(getUser(HEADERS));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account/login" exact component={UserLogin} />
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
