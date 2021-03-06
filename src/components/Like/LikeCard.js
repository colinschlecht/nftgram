import React from "react";
import { 
  Card, 
  Image, 
  // Icon 
} from "semantic-ui-react";
import logo from "../../images/ethcam.svg";

const LikeCard = ({ like, location }) => {
  const userAvi = `https://ipfs.io/ipfs/${like.user.avatar}`;

  return (
    <>
      <Card className="liker card">
        <Card.Content className="liker card userdiv">
          {userAvi ? (
            <Image src={userAvi} alt={like.user.username} avatar></Image>
          ) : (
            <Image src={logo} alt={like.user.username} avatar></Image>
          )}
          <div className="user bio combo">
            <span className={`${location} like card username`}>{like.user.username} </span>{" "}
            {like.user.bio ? (
              <span className={`${location} liker card biodiv trunc bio small`}> {like.user.bio}</span>
            ) : (
              <span className={`${location} liker card biodiv trunc bio small`}>
                User has not set up a bio...
              </span>
            )}
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

export default LikeCard;
