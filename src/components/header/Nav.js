import React from "react";
import { Link } from "react-router-dom";
import LogOut from "../user/LogOut";

export default function Nav() {
  return (
    <div className="ui secondary pointing menu">
      <div className="menu">


      <Link to="/" className="item">
        Home
      </Link>
        <Link to="/art/new" className="item">
          <i className="camera retro icon"></i>
        </Link>

        <Link to="/account/Login" className="item">
          account{" "}
        </Link>
        <LogOut />

        
      </div>
    </div>
  );
}
