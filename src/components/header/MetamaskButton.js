import React, { useState } from "react";
// import { ethErrors } from 'eth-rpc-errors'
import { Button, Icon } from "semantic-ui-react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useDispatch } from "react-redux";
import { connect, createUser, raiseAlert, lowerAlert } from "../../actions";
import CopyButton from "./copyButton";
// import { getNFTHistory } from "../../api/etherscan";

const MetamaskButton = () => {
  const dispatch = useDispatch();
  const { ethereum } = window;
  const onboarding = new MetaMaskOnboarding();
  const [message, setMessage] = useState("");
  const [currentAcct, setCurrent] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [dropped, setDropped] = useState("");

  // const handleNFTload = async (acct) => {
  //   const load = await getNFTHistory(acct)
  //   console.log(load)
  // }

  const handleDropdown = (e) => {
    e.preventDefault()
    if(!dropped){
      setDropped("dropped")
    } else {
      setDropped("")
    }
  }

  const clearMessage = () => {
    window.setTimeout(function () {
      setMessage("");
    }, 3000);
  };

  const handleNewAccount = () => {
    window.ethereum.request({ method: "eth_accounts" }).then((account) => {
      dispatch(connect(account));
      dispatch(createUser({ metamask_account: account[0] }));
      setCurrent(account[0]);
      setLoading(false);
    });

    if (message.length > 0) {
      setMessage("");
      setLoading(false);
    } else {
      setMessage(currentAcct);
      setLoading(false);
    }
  };

  const handleChangedAccount = () => {
    window.ethereum
      .request({ method: "eth_accounts" })
      .then(async (account) => {
        dispatch(connect(account));
        dispatch(createUser({ metamask_account: account[0] }));
        dispatch(raiseAlert("Account Changed"));
        dispatch(lowerAlert());
        setCurrent(account[0]);
        setLoading(false);
        setMessage(account[0]);
        clearMessage();
      });
  };

  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  const onConnectClick = async () => {
    if (!listening) {
      window.ethereum.on("accountsChanged", () => handleChangedAccount());
      setListening(!listening);
      setLoading(true);
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          handleNewAccount();
        })
        .catch((err) => {
          setMessage(err.message);
          setLoading(false);
        });
      dispatch(raiseAlert("Connected"));
      dispatch(lowerAlert());
    }
    if (message.length > 0) {
      setMessage("");
      setLoading(false);
    } else {
      setMessage(currentAcct);
      setLoading(false);
    }
  };

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      return (
        <Button id="metamask-button" onClick={() => onClickInstall()}>
          Click here to install MetaMask!
        </Button>
      );
    } else {
      return (
        <Button
          id="metamask-button"
          loading={loading}
          onClick={() => onConnectClick()}
        >
          {currentAcct.length > 0 ? "Connected" : "Connect to Metamask"}
        </Button>
      );
    }
  };

  return (
    <div className="menu" id="top-menu">
        <a href="/expand-menu" onClick={(e) =>handleDropdown(e)}><Icon name="angle down" id={`angled-icon-top${dropped}`} /></a>
      <div className="menu" id={`button-container${dropped}`}>
        {MetaMaskClientCheck()}
        {message[0] === "0" ? (
          <div className="metamask message positive">
           <span className="metamask-message trunc"> {message} </span>
            <CopyButton message={message} mod={"inverse"} />
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

export default MetamaskButton;
