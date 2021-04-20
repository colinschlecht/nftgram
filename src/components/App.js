import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Explore from "./Explore";
import UserCreate from "./user/UserCreate";
import UserLogin from "./user/UserLogin";
import UserDelete from "./user/UserDelete";
import UserEdit from "./user/UserEdit";
import Profile from "./user/Profile";
import Nav from "./header/Nav";
import { getUser } from "../actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HEADERS, TOKEN } from "../api";

const App = () => {
  const dispatch = useDispatch();

  //!re-auth on page refresh
  useEffect(() => {
    dispatch(getUser(HEADERS, TOKEN)).then(res => console.log(res));
  },);

  return (
    <>
      <BrowserRouter>
          <Nav />
        <div className="ui centered grid">
          <Switch>
            <Route path="/" exact component={Explore} />
            <Route path="/account/login" exact component={UserLogin} />
            <Route path="/account/new" exact component={UserCreate} />
            <Route path="/account/edit/:id" exact component={UserEdit} />
            <Route path="/account/delete/:id" exact component={UserDelete} />
            <Route path="/account/:id" exact component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
