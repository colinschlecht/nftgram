import React
//, {useEffect}
from
"react";
import {
  useSelector,
  // useDispatch
} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useBrowserStatus from "./BrowserStatus";
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
import Dash from "./Admin/Dash";
import SideBar from "./header/SideBar";
import Documentation from "./Docs/Documentation";
// import { getProvider } from "../utils/web3";
// import { getSales } from "../actions";

const App = () => {
  // const dispatch = useDispatch();
  const alerted = useSelector((state) => !!state.UI.messages.length);
  const modal = useSelector((state) => state.UI.modal);

  //custom hook to determine if browser or mobile
  useBrowserStatus();

  return (
    <>
      <BrowserRouter>
        <>
          <Switch>
            <>
              <div className="mm alerts container">{alerted && <Alert />}</div>
              {modal && <OpenModal modal={modal} />}
              <div className="menu" id="top-menu">
                <MetamaskButton />
              </div>
              <SideBar />
              <div id="main" className="ui centered grid">
                <div id="nav" className="hide-nav">
                  <Nav />
                </div>
                <Route path="/" exact component={Explore} />
                <Route path="/art/new" exact component={CreateArt} />
                <Route path="/profile/edit/:id" exact component={UserEdit} />
              </div>
              <Route path="/art/show/:id" exact component={ArtShow} />
              <Route path="/profile/:id" exact component={Profile} />
              <Route
                path="/admin/contracts/query"
                exact
                component={Dash}
              />
              <Route path="/documentation" exact component={Documentation} />
            </>
          </Switch>
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
