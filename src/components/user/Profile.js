import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Body from "./ProfileArtCard"
import { getNFTHistory } from "../../api/etherscan";

const Profile = ({match}) => {
  
  const wallet = useSelector((state) => state.MetaMask);


  
useEffect(() => {

 const getAcct = async () => {
  if(wallet.account && wallet.account == match.params.id){
    const load = await getNFTHistory(wallet.account)
    console.log(load)
  } else {
    console.log("nah")
  }
}
getAcct()

  }, [wallet])

  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};
export default Profile;
