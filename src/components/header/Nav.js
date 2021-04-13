import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          Also Home
        </Link>
        <Link to="/account/new" className="item">
          Sign Up
        </Link>
        <Link to="/account/login" className="item">
          Log in
        </Link>
      </div>
    </div>
  );
}
