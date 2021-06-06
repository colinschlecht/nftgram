import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Body from "./ProfileArtCard";
import { getNFTHistory } from "../../api/etherscan";
import { generate } from "../../actions";
import { Button } from "semantic-ui-react";

const Profile = ({ match }) => {
  const wallet = useSelector((state) => state.MetaMask);

  const [randomName, setRandom] = useState("");


  useEffect(() => {
    const getAcct = async () => {
      if (wallet.account && wallet.account == match.params.id) {
        const load = await getNFTHistory(wallet.account);
        console.log(load);
      } else {
        console.log("nah");
      }
    };
    getAcct();
  }, [wallet]);


  const handleClick = async (e) => {
    e.preventDefault()
    const name = await generate()
    console.log(name.data.name)
    setRandom(name.data.name)
  }

  return (
    <div>
      <Header />
      <Button onClick={(e) => handleClick(e)}/>
      <h1>{randomName}</h1>
      <Body />
    </div>
  );
};
export default Profile;
