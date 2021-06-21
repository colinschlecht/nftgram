import React from 'react'
import { Header, Segment} from "semantic-ui-react";

const ShowEvents = () => {
    return (
        <div className="artshow details">
          <Header as="h4" attached="top" className="artshow detail title" block>
            Events
          </Header>
          <Segment attached className="likes background">
           <i>Events coming soon!</i>
          </Segment>
          <Header as="h4" attached="bottom" className="artshow detail title" block>
            <span className="cartspan salemessage">hide</span>
          </Header>
    
        </div>
      );
}

export default ShowEvents
