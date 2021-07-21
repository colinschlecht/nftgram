import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setOpen } from "../../actions";
import PlaceholderExampleImage from "../user/PPPlaceHolder";
import CopyButton from "./copyButton";
import SideBarPlaceHolder from "./SideBarPlaceHolder";

import { Icon, Divider } from "semantic-ui-react";

const SideBar = () => {
  const dispatch = useDispatch();
  const opn = useSelector((state) => state.UI.open);
  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });
  const ad = useSelector((state) => state.auth.isAdmin);

  
  
  const [admin, setAdmin] = useState(false);
  const [opened, setOpened] = useState("");
  const [localUser, setLocalUser] = useState("");
  
  useEffect(() => {
    setAdmin(ad);
  }, [ad]);

  useEffect(() => {
    if (opn) {
      setOpened("opened");
      document.body.classList.add("-side-bar-opened");
    } else {
      setOpened("");
      document.body.classList.remove("-side-bar-opened");
    }
  }, [opn]);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setOpen());
  };

  return localUser ? (
    <>
      <div
        id="opened-background-effect"
        onClick={opened ? (e) => handleClick(e) : null}
      ></div>
      <a
        href="side-menu"
        id="side-menu-button"
        className="link-text side-menu-button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      >
        {!!opened ? (
          <Icon name="close" id="side-close" />
        ) : (
          <Icon name="bars" id="side-open" />
        )}
      </a>
      <div id={`side-menu-${opened}`} onClick={(e) => e.stopPropagation()}>
        <div className="side-menu user-area">
          <div className="side-menu user image">
            {localUser?.avatar ? (
              <Link to={`/profile/${localUser?.id}`}>
                {" "}
                <img onClick={()=>dispatch(setOpen())}
                  alt={`${localUser.username}'s profile pic. Nice!`}
                  className="ui small circular image avatar"
                  // src={`https://gateway.pinata.cloud/ipfs/${avatar}`}
                  src={`https://ipfs.io/ipfs/${localUser.avatar}`}
                ></img>{" "}
              </Link>
            ) : (
              <PlaceholderExampleImage />
            )}
          </div>
          <div className="side-user-info">
            <Link
              to={`/profile/${localUser?.id}`}
              className="side-bar-menu-item item"
              onClick={()=>dispatch(setOpen())}
            >
              <h4>
                <Icon name="user" /> {localUser.username}
              </h4>
            </Link>
            <h4>
              <Icon name="ethereum" />
              {`${localUser?.metamask_account.slice(
                0,
                6
              )}.......${localUser?.metamask_account.slice(35)}`}
              <CopyButton message={localUser?.metamask_account} />
            </h4>
          </div>
        </div>
        <Divider id="side-menu-divider" />
        <div className="non-user-links">
          <Link to="/" className="side-bar-menu-item item non-user" onClick={()=>dispatch(setOpen())}>
            <h1>
              <Icon name="object group" />
            </h1>
              <h4 className="non-user-title">Explore Art</h4>
          </Link>
          <Divider id="side-menu-divider"/>
          <Link to="/art/new" className="side-bar-menu-item item non-user" onClick={()=>dispatch(setOpen())}>
            <h1>
              <Icon name="camera retro" />
            </h1>
            <h4 className="non-user-title">Create a Post</h4>
          </Link>
          <Divider id="side-menu-divider"/>
          <Link to="/documentation" className="side-bar-menu-item item non-user" onClick={()=>dispatch(setOpen())}>
              <h1>
              <Icon name="folder open" />
              </h1>
            <h4 className="non-user-title">Documentation</h4>
          </Link>
          {admin && <Link to="/admin/contracts/query" className="side-bar-menu-item item non-user" onClick={()=>dispatch(setOpen())}>
              <h1>
              <Icon name="universal access" />
              </h1>
            <h4 className="non-user-title">Admin</h4>
          </Link>}
        </div>
      </div>
    </>
  ) : (
    <SideBarPlaceHolder />
  );
};

export default SideBar;
