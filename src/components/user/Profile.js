import React, { useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import { showUser } from "../../actions";

const Profile = ({ match }) => {
  const [user, setUser] = useState("");


useEffect(() => {
  const getUser = async () => {
    const resp = await showUser(match.params.id)
    setUser(resp.data)
  }
  getUser()
 
},[match])

  return (
    <div>
      <Header user={user} />
      <Body user={user} />
    </div>
  );
};
export default Profile;
