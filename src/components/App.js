import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./header/Nav";
import Explore from "./Explore";
import CreateArt from "./Art/CreateArt";
import ArtShow from "./Art/ArtShow";
import Profile from "./user/Profile";
import UserEdit from "./user/UserEdit";
// import MainLogin from "./user/MainLogin";
import MetamaskButton from "./header/MetamaskButton";
import Alert from "./header/Alert";
import OpenModal from "./modals/OpenModal";

import { sales, salesDetailed } from "../utils/SFInteract";


const App = () => {
  const alerted = useSelector((state) => !!state.UI.messages.length);
  const modal = useSelector((state) => state.UI.modal);

  // const [allSales, setSales] = useState("");
  // const [allDetailedSales, setAllDetailedSales] = useState("");


  // useEffect(() => {
  //   const getSales = async () => {
  //     const theSales = await sales();
  //     const detailedSales = await salesDetailed();
  //     setSales({ ...theSales });
  //     setAllDetailedSales({ ...detailedSales });
  //   };
  //   if (!allSales) {
  //     getSales();
  //   }
  // }, [allSales]);

  // console.log(allSales)
  // console.log(allDetailedSales)

  return (
    <>
      <BrowserRouter>
        <>
          <Switch>
            <>
              <div className="mm alerts container">{alerted && <Alert />}</div>
              {modal && <OpenModal modal={modal} />}
              <MetamaskButton />
              <div id="main" className="ui centered grid">
                <div id="nav">
                  <Nav />
                </div>
                <Route path="/" exact component={Explore} />
                <Route path="/art/new" exact component={CreateArt} />
                <Route path="/profile/edit/:id" exact component={UserEdit} />
              </div>
              <Route path="/art/show/:id" exact component={ArtShow} />
              <Route path="/profile/:id" exact component={Profile} />
            </>
          </Switch>
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
