import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Body from "./Body";
// import { getNFTHistory } from "../../api/etherscan";
import { generate, showUser } from "../../actions";
import { Button } from "semantic-ui-react";

const Profile = ({ match }) => {
  const wallet = useSelector((state) => state.MetaMask);
  const [randomName, setRandom] = useState("");
  const [user, setUser] = useState({});
  const [self, setSelf] = useState(false);

  const determineSelf = () => wallet.account === user.metamask_account;

  useEffect(() => {
    //load the art associated with the user id of the profile
    const getAcct = async () => {
      const user_object = await showUser(match.params.id);
      setUser(user_object.data);
    };
    getAcct();
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const name = await generate();
    setRandom(name.data.name);
  };

  return (
    <div>
      <Header user={user} self={self}/>
      <Button onClick={(e) => handleClick(e)} />
      <h1>{randomName}</h1>
      <Body user={user} />
    </div>
  );
};
export default Profile;
