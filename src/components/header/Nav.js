import React from "react";
import { Link } from "react-router-dom";
import LogOut from "../user/LogOut";
import { useSelector } from "react-redux";

export default function Nav() {

  const user = useSelector((state) => {
    if (!!state.auth.user) {
      return state.auth.user;
    } else {
      return false;
    }
  });
  return (
    <div className="ui secondary pointing menu">
      <div className="menu">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/art/new" className="item">
          <i className="camera retro icon"></i>
        </Link>

        {user && (
          <Link to={`/profile/${user.id}`} className="item">
            profile{" "}
          </Link>
        )}
        <LogOut />
      </div>
    </div>
  );
}
