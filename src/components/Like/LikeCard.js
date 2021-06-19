import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import logo from '../../images/ethcam.svg'



const LikeCard = ({ like }) => {

    const userAvi = like.user.avatar

  return (
    <>
      <Card className="liker card">
        <Card.Content className="liker card userdiv">
            {userAvi ? (<Image src={userAvi} alt={like.user.username} avatar></Image>) : (<Image src={logo} alt={like.user.username} avatar></Image>)}
            {like.user.username}
        </Card.Content>
        {like.user.bio ? (        <Card.Content className="liker card biodiv trunc">
        Bio:<Icon name="caret right" /> <span className="bio small"> {like.user.bio}</span>
        </Card.Content>) : (       <Card.Content className="liker card biodiv trunc">
        Bio:<Icon name="caret right" /> <span className="bio small">User has not set up a bio...</span>
        </Card.Content>)}
      </Card>
    </>
  );
};

export default LikeCard;
