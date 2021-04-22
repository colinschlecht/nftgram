import React, { useEffect, useState } from "react";
import UserLogin from "./UserLogin";
import UserCreate from "./UserCreate";
import { HEADERS, TOKEN } from "../../api";
import { getUser } from "../../actions";
import { useDispatch } from "react-redux";

// import { useSelector } from "react-redux";

const MainLogin = (props) => {
  const dispatch = useDispatch();

  const [loginPage, setLoginPage] = useState(true);

  const changePage = (bool) => {
    setLoginPage(bool);
  };



  return (
    <>
      <div className="ui middle aligned center aligned grid" id="testing">
        <div className="column" id="logincolumn">
          <div
            className="row"
            id="top"
            onClick={() => changePage(true)}
            onPointerOver={() => changePage(true)}
          >
            <h1
              id="toplogintext"
              onClick={() => changePage(true)}
              onPointerOver={() => changePage(true)}
            >
              {" "}
              Log In
            </h1>
          </div>

          {loginPage ? (
            <UserLogin loginPage={loginPage} history={props.history}/>
          ) : (
            <UserCreate loginPage={loginPage} history={props.history}/>
          )}
          <div
            className="row"
            id="bottom"
            onPointerOver={() => changePage(false)}
            onClick={() => changePage(false)}
          >
            <h1
              id="bottomlogintext"
              onPointerOver={() => changePage(false)}
              onClick={() => changePage(false)}
            >
              Sign up
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLogin;
