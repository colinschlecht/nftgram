import React/*, { useEffect } */from "react";
import LoginForm from "./LoginForm";
import { loginUser/*, getUser */} from "../../actions";
import { useDispatch } from "react-redux";
import  MainLogin  from "./MainLogin";
// import { HEADERS, TOKEN } from "../../api";



const UserLogin = (props) => {
  
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUser(HEADERS, TOKEN)).then(props.history.push("/"));
  // },);


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
      <h3>Log In</h3>
      <MainLogin />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default UserLogin;
