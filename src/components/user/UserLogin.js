import React /*, { useEffect } */ from "react";
import LoginForm from "./LoginForm";
import { loginUser /*, getUser */ } from "../../actions";
import { useDispatch } from "react-redux";
// import { HEADERS, TOKEN } from "../../api";

const UserLogin = (props) => {
  const dispatch = useDispatch();
  
  const onSubmit = (formValues) => {
    dispatch(loginUser(formValues)).then((res) => {
      localStorage.setItem("token", res.data.jwt);
      if (res.status === 202) {
        props.history.push("/");
      }
    });
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} loginPage={props.loginPage} />
    </>
  );
};

export default UserLogin;
