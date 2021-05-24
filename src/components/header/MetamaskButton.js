import React, { useState } from "react";
// import { ethErrors } from 'eth-rpc-errors'
import { Button } from "semantic-ui-react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useDispatch } from "react-redux";
import { connect } from "../../actions";

const MetamaskButton = () => {
  const dispatch = useDispatch();

  const { ethereum } = window;
  const onboarding = new MetaMaskOnboarding();
  const [isDisabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const [toggleAcct, setToggleAcct] = useState(false);

  const handleNewAccount = () => {
    window.ethereum.request({ method: "eth_accounts" }).then((account) => {
      
      dispatch(connect(account));

      if (!toggleAcct){
        setMessage(account);
      } else {
        setMessage("")
      }
      setDisabled(false)
    });
  };

  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  const onConnectClick = async () => {
   const connected =  await window.ethereum.request({ method: "eth_accounts" }).then(accts => accts.length > 0)
   if(connected) {
     setToggleAcct(!toggleAcct)
   }
   setDisabled(true)
    setMessage("Connecting...")
    window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      handleNewAccount();
      window.ethereum.on("accountsChanged", () => handleNewAccount());
      
    }).catch( err => {
      setMessage(err.message)
    })
  };

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      return (
        <Button disabled={isDisabled} onClick={() => onClickInstall()}>
          Click here to install MetaMask!
        </Button>
      );
    } else {
      return (
        <Button disabled={isDisabled} onClick={() => onConnectClick()}> {"Connect Metamask" }</Button>
      );
    }
  };

  return (
    <div className="ui secondary pointing menu">
      <div className="menu">
        {MetaMaskClientCheck()}
        <div className="item">{message}</div>
      </div>
    </div>
  );
};

export default MetamaskButton;
