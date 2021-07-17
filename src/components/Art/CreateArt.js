import React from 'react'
import ArtForm from './ArtForm'
import { Segment } from 'semantic-ui-react'


const CreateArt = () => {

    
    return (
        <div id="arts-container" className="uploading-art">
            <Segment>
            <ArtForm />
            </Segment>
        </div>
    )
}
export default CreateArt;