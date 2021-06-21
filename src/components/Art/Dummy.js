import React from "react";

import {
  Divider,
  Card,
  Form,
  Icon,
  Placeholder,
  Button,
} from "semantic-ui-react";

const Dummy = () => {
  return (
    <>
      <Card fluid id="loading-explorecard" className="loading">
        <Card.Content className="placeholderphotocontainer loading">
        
            <Placeholder className="placeholderphotocontainer loading">
              <Placeholder.Image square className="picture"/>
            </Placeholder>
         
        </Card.Content>
        <Card.Content>
          <Card.Header>
            <>
              <span id="like-button-main" className="nll">
                <Icon name="fire" />
              </span>
              <Placeholder>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="full" />
                <Placeholder.Line length="medium" />
              </Placeholder>
            </>
          </Card.Header>

          <Divider />
          <Form reply>
            <Form.TextArea placeholder="loading" />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              className="nll"
              disabled
            />
          </Form>
        </Card.Content>
      </Card>
    </>
  );
};

export default Dummy;
