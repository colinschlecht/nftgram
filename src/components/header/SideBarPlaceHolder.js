import React, { useState, useEffect } from "react";
import { Icon, Divider } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { setOpen, setDropped } from "../../actions";
import PlaceholderExampleImage from "../user/PPPlaceHolder";

import { Link } from "react-router-dom";

const SideBarPlaceHolder = () => {
  const dispatch = useDispatch();
  const opn = useSelector((state) => state.UI.open);

  const [opened, setOpened] = useState("");

  useEffect(() => {
    if (opn) {
      setOpened("opened");
      document.body.classList.add("-side-bar-opened");
    } else {
      setOpened("");
      document.body.classList.remove("-side-bar-opened");
    }
  }, [opn]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setOpen());
  };
  const handleAttention = (e) => {
    e.preventDefault();
    dispatch(setDropped());
  };

  return (
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
          <div className="side-menu user image" >
            <a href="/user-profile" onClick={(e) => handleAttention(e)}><PlaceholderExampleImage /></a>
          </div>
          <div className="side-user-info">
            <a
              href="/user-profile"
              className="side-bar-menu-item item"
              onClick={(e) => handleAttention(e)}
            >
              <h4>
                <Icon name="user" /> Unknown User
              </h4>
            </a>
            <h4>
              <Icon name="ethereum" />
              MetaMask Address
            </h4>
          </div>
        </div>
        <Divider id="side-menu-divider" />
        <div className="non-user-links">
          <Link
            to="/"
            className="side-bar-menu-item item non-user"
            onClick={()=>dispatch(setOpen())}
          >
            <h1>
              <Icon name="object group" />
            </h1>
            <h4 className="non-user-title">Explore Art</h4>
          </Link>
          <Divider id="side-menu-divider" />
          <Link
            to="/art/new"
            className="side-bar-menu-item item non-user"
            onClick={(e) => handleAttention(e)}
          >
            <h1>
              <Icon name="camera retro" />
            </h1>
            <h4 className="non-user-title">Create a Post</h4>
          </Link>
          <Divider id="side-menu-divider" />
          <Link
            to="/documentation"
            className="side-bar-menu-item item non-user"
            onClick={()=>dispatch(setOpen())}
          >
            <h1>
              <Icon name="folder open" />
            </h1>
            <h4 className="non-user-title">Documentation</h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBarPlaceHolder;
