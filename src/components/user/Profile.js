import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import { showUser } from "../../actions";

const Profile = ({ match }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState("");
  
console.log("hi")

useEffect(() => {
  const getUser = async () => {
    const resp = await showUser(match.params.id)
    setUser(resp.data)
  }
  getUser()
  
},[match, dispatch])


  return (
    <div className="profile container">
      <Header user={user} />
      <Body user={user} />
    </div>
  );
};
export default Profile;
