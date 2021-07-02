import React from "react";
import ProfileArtCard from "./ProfileArtCard";
import { Segment } from "semantic-ui-react";
const Body = ({ user }) => {
  return (
    <>
      <Segment attached="top" className="header block"></Segment>
      <Segment attached="bottom">
        <div className="body container">
          {user.arts
            ? user.arts.map((art) => <ProfileArtCard key={art.id} art={art} />)
            : null}
        </div>
      </Segment>
    </>
  );
};

export default Body;
