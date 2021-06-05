import React, { useState } from "react";
// import { ethErrors } from 'eth-rpc-errors'
import { Button } from "semantic-ui-react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useDispatch } from "react-redux";
import { connect } from "../../actions";
import CopyButton from "./copyButton";
// import { getNFTHistory } from "../../api/etherscan";


const MetaMaskButton = () => {
  const dispatch = useDispatch();
  const { ethereum } = window;
  const onboarding = new MetaMaskOnboarding();
  const [message, setMessage] = useState("");
  const [currentAcct, setCurrent] = useState("");
  const [loading, setLoading] = useState(false);


  // const handleNFTload = async (acct) => {
  //   const load = await getNFTHistory(acct)
  //   console.log(load)
  // }

  const clearMessage = () => {
    window.setTimeout(function () {
      setMessage("");
    }, 3000);
  };

  const handleNewAccount = () => {
    window.ethereum.request({ method: "eth_accounts" }).then((account) => {
      dispatch(connect(account));
      setCurrent(account[0]);
      setLoading(false);
      // handleNFTload(account[0])
    });
    if (message.length > 0) {
      setMessage("");
    } else {
      setMessage(currentAcct);
    }
  };

  const handleChangedAccount = () => {
    window.ethereum.request({ method: "eth_accounts" }).then((account) => {
      dispatch(connect(account));
      setCurrent(account[0]);
      setLoading(false);
      setMessage(account[0]);
      clearMessage();
      // handleNFTload(account[0])
    });
  };

  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  const onConnectClick = async () => {
    setLoading(true);
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        handleNewAccount();
        window.ethereum.on("accountsChanged", () => handleChangedAccount());
      })
      .catch((err) => {
        setMessage(err.message);
        setLoading(false);
      });
  };

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      return (
        <Button onClick={() => onClickInstall()}>
          Click here to install MetaMask!
        </Button>
      );
    } else {
      return (
        <Button loading={loading} onClick={() => onConnectClick()}>
          {currentAcct.length > 0 ? "Connected" : "Connect to Metamask"}
        </Button>
      );
    }
  };

  return (
    <div className="ui secondary pointing menu">
      <div className="menu">
        {MetaMaskClientCheck()}
        <div className="item">
          {message[0] === "0" ? (
            <>
              {message}<CopyButton message={message} />
            </>
          ) : (
            message
          )}
        </div>
      </div>
    </div>
  );
};

export default MetaMaskButton;
