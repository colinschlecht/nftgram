import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'


export const ArtCard = props => {

    const { art } = props
    return (
        <>
            <Card fluid >
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
            <Card.Content>
            <Card.Header>
                <Icon name='like' />
                 
                </Card.Header>
                <p>liked by  <a href="/"><b>Elon Tusk </b>and <b>{art.attributes.likes} others</b></a> </p>
            </Card.Content>
            </Card>
        </>
    )
}


