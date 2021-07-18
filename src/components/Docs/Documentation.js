import React, { useState } from "react";

import About from "./About";
import NFT from "./NFT";
import MetaMask from "./MetaMask";
import Usage from "./Usage";

const Documentation = () => {
  const [about, setAbout] = useState(true);
  const [nFT, setNFT] = useState(false);
  const [metaMask, setMetaMask] = useState(false);
  const [usage, setUsage] = useState(false);

  const handleDisplay = (e, display) => {
    e.preventDefault();
    setAbout(false);
    setNFT(false);
    setMetaMask(false);
    setUsage(false);
    switch (display) {
      case "ABOUT":
        setAbout(true);
        break;
      case "NFT":
        setNFT(true);
        break;
      case "METAMASK":
        setMetaMask(true);
        break;
      case "USAGE":
        setUsage(true);
        break;
      default:
        setAbout(true);
    }
  };

  const setChoice = (disp) =>
    disp ? "docs-list-item focused" : "docs-list-item";

  return (
    <div id="outer-docs-container">
      <div id="main-docs-container" className="docs-main">
        <ul className="docs-bar docs-list">
          <li
            className={setChoice(about)}
            id="ABOUT"
            onClick={(e) => handleDisplay(e, "ABOUT")}
          >
            About
          </li>
          <li
            className={setChoice(nFT)}
            id="NFT"
            onClick={(e) => handleDisplay(e, "NFT")}
          >
            NFT
          </li>
          <li
            className={setChoice(metaMask)}
            id="METAMASK"
            onClick={(e) => handleDisplay(e, "METAMASK")}
          >
            MetaMask
          </li>
          <li
            className={setChoice(usage)}
            id="USAGE"
            onClick={(e) => handleDisplay(e, "USAGE")}
          >
            Usage
          </li>
        </ul>
        <div className="docs-holder">
            <div className="inner-docs-holder">
          {about && <About />}
          {nFT && <NFT />}
          {metaMask && <MetaMask />}
          {usage && <Usage />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
