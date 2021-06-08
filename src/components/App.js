import React from "react";
// import { getUser } from "../actions";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { HEADERS, TOKEN } from "../api";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./header/Nav";
import Explore from "./Explore";
import CreateArt from "./Art/CreateArt";
import ArtShow from "./Art/ArtShow";
import Profile from "./user/Profile";
import UserEdit from "./user/UserEdit";
// import MainLogin from "./user/MainLogin";
import MetamaskButton from "./header/MetamaskButton";

const App = () => {
  // const dispatch = useDispatch();

  // //!re-auth on page refresh
  // dispatch(getUser(HEADERS, TOKEN)).then(console.log("authed"));

  return (
    <>
      <BrowserRouter>
        <>
          <Switch>
            {/* <Route path="/account/login" exact component={MainLogin} /> */}
            <>
              <MetamaskButton />
              <div id="main" className="ui centered grid">
                <div id="nav">
                  <Nav />
                </div>
                <Route path="/" exact component={Explore} />
                <Route path="/art/new" exact component={CreateArt} />
                <Route path="/art/:id" exact component={ArtShow} />
                <Route path="/profile/:id" exact component={Profile} />
                <Route path="/profile/edit/:id" exact component={UserEdit} />
              </div>
            </>
          </Switch>
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
