import React from "react";
import LoginForm from "./LoginForm";
import { createUser,  } from "../../actions";
import { useDispatch } from "react-redux";


const UserCreate = (props) => {
  const dispatch = useDispatch();


  const onSubmit = (input) => {
    dispatch(createUser(input)).then((res) => {
      localStorage.setItem("token", res.data.jwt)
      if (res.status === 201) {
       props.history.push("/");
      }
    });
  };

  
    return (
      <>
        <LoginForm onSubmit={onSubmit} loginPage={props.loginPage}/>
      </>
    );
  
}

export default UserCreate;

