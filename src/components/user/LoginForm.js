import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useForm } from "react-hook-form";


//! this form is used for user account creation and user login !//


const LoginForm = ( props ) => {

  
  
return (
  <div id="outer-login">
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>

      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button fluid size='large' onClick={()=>props.onSubmit()}>
            {props.loginPage ?
            "Login"
            :
            "Sign Up"
            }
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  </div>
)
}

export default LoginForm;