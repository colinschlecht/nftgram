import React from "react";
import LoginForm from "./LoginForm";
import { createUser,  } from "../../actions";
import { useDispatch } from "react-redux";



const UserCreate = (props) => {
  const dispatch = useDispatch();


  const onSubmit = (formValues) => {
    console.log(formValues)
    // console.log(formValues);
    // dispatch(createUser(formValues)).then((res) => {
    //   localStorage.setItem("token", res.data.jwt)
    //   console.log(res);
    //   if (res.status === 201) {
    //    props.history.push("/");
    //   }
    // });
  };

  
    return (
      <>
        <LoginForm onSubmit={onSubmit} loginPage={props.loginPage}/>
      </>
    );
  
}

export default UserCreate;

