import React from 'react'
import { Popup } from 'semantic-ui-react'

const PopUp = (message, trig) => (
  <Popup content={message} trigger={trig} />
)

export default PopUp