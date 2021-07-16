import React from "react";

import { Header, Segment } from "semantic-ui-react";
import CopyButton from "../header/copyButton";

const ShowDetails = ({ art }) => {
  return (
    <div className="artshow details">
      <Header className="artshow detail title" as="h4" attached="top" block>
        Owner
      </Header>
      <Segment attached className="artshow detail seg">
        {art.user?.username}
      </Segment>
      <Segment attached="bottom" className="artshow detail seg">
        <h5 className="trunc">
          <CopyButton message={art.user?.metamask_account} />
          {art.user?.metamask_account}
        </h5>
      </Segment>
      <Header className="artshow detail title" as="h4" attached="top" block>
        Created by
      </Header>
      <Segment attached className="artshow detail seg">
        {art.artist?.username}
      </Segment>
      <Segment attached="bottom" className="artshow detail seg">
        <h5 className="trunc">
          <CopyButton message={art.artist?.metamask_account} />
          {art.artist?.metamask_account}
        </h5>
      </Segment>
      <Header className="artshow detail title" as="h4" attached="top" block>
        Artwork CID
      </Header>
      <Segment attached className="artshow detail seg">
        <h5 className="trunc">
          <CopyButton message={art.cid} />
          {art?.cid}
        </h5>
      </Segment>
      <Header className="artshow detail title" as="h4" attached block>
        Token URI
      </Header>
      <Segment attached className="artshow detail seg">
        <h5 className="trunc">
          <CopyButton message={art.tokenURI} />
          {art?.tokenURI}
        </h5>
      </Segment>
      <Header className="artshow detail title" as="h4" attached block>
        ERC 721 Contract Address
      </Header>
      <Segment attached className="artshow detail seg">
        <h5 className="trunc">
          <CopyButton message={art.contract_address} />
          {art?.contract_address}
        </h5>
      </Segment>
      <Header className="artshow detail title" as="h4" attached block>
        Token ID
      </Header>
      <Segment attached="bottom" className="artshow detail title">
        {art.tokenID}
      </Segment>
    </div>
  );
};
export default ShowDetails;
