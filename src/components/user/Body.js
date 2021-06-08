import React from "react";
import ProfileArtCard from "./ProfileArtCard";

const Body = ({user}) => {
  return (
    <>
    {user.arts ? user.arts.map(art => <ProfileArtCard key={art.id} art={art}/>) : null}
    </>
  );
};

export default Body
