import React from "react";
import { getUser } from "../actions";
import { showMenu } from "../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HEADERS, TOKEN } from "../api";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./header/Nav";
import Explore from "./Explore";
import CreateArt from "./Art/CreateArt";
// import UserCreate from "./user/UserCreate";
import UserDelete from "./user/UserDelete";
import Profile from "./user/Profile";
import UserEdit from "./user/UserEdit";
// import UserLogin from "./user/UserLogin";
import MainLogin from "./user/MainLogin";

const App = () => {
  const dispatch = useDispatch();

  const menuStatus = useSelector((state) => state.art.page);


  //!re-auth on page refresh
  useEffect(() => {
    dispatch(getUser(HEADERS, TOKEN)).then(res => console.log(res));
  },);
  
  const changeMenu = () => {
    dispatch(showMenu());

  }

  return (
    <>
      <BrowserRouter>
      <>
          <Switch>
            <Route path="/account/login" exact component={MainLogin} />
            <>
        <div id="main" className="ui centered grid">
        <div onMouseOver={()=> changeMenu()} id="nav">
          <Nav />
        </div>
            <Route path="/" exact component={Explore} />
            <Route path="/art/new" exact component={CreateArt} />
            <Route path="/account/edit/:id" exact component={UserEdit} />
            <Route path="/account/delete/:id" exact component={UserDelete} />
            <Route path="/account/:id" exact component={Profile} />
        </div>
        </>
          </Switch>
          </>
      </BrowserRouter>
    </>
  );
};

export default App;
