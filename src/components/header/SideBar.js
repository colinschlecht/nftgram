import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../actions";

const SideBar = () => {
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
        p
      </div>
    </>
  );
};

export default SideBar;
