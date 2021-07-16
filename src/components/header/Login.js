import React from "react";
import { useDispatch } from "react-redux";
import { setDropped } from "../../actions";
const Login = () => {
    const dispatch = useDispatch()


  const catchAttention = (e) => {
    e.preventDefault();
    dispatch(setDropped())
    
    
  };
  return (
    <>
      <a href="/" className="item" onClick={(e) => catchAttention(e)}>
        Log In
      </a>
    </>
  );
};

export default Login;
