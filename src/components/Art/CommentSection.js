import React, { useState } from "react";
import { Checkbox, Comment as Comm } from 'semantic-ui-react'

export const CommentSection = (props) => {
    const [{art}/*, setArt*/] = useState( props )
    const [{Comment}/*, setArt*/] = useState( props )
    return (
        <Comm.Group>
        <>
        <Comm>
            <Comm.Content>
              <Comm.Author as='a'>Christian Rocha</Comm.Author>
              <Comm.Metadata>
                <span>2 days ago</span>
              </Comm.Metadata>
              <Comm.Text>
                this is a comment
              </Comm.Text>
              <Comm.Actions>
                <a>Reply</a>
              </Comm.Actions>
            </Comm.Content>
            </Comm>
            <br></br>
        <Checkbox
        defaultChecked
        label='Collapse Comms'
        // onChange={this.handleCheckbox}
      />
      </>
          <Comm>
            <Comm.Avatar as='a' src='/images/avatar/small/christian.jpg' />
            <Comm.Content>
              <Comm.Author as='a'>Christian Rocha</Comm.Author>
              <Comm.Metadata>
                <span>2 days ago</span>
              </Comm.Metadata>
              <Comm.Text>
                I'm very interested in this motherboard. Do you know if it'd
                work in a Intel LGA775 CPU socket?
              </Comm.Text>
              <Comm.Actions>
                <a>Reply</a>
              </Comm.Actions>

            </Comm.Content>
            </Comm>
            </Comm.Group>
    )
}
