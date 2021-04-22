import React from "react";
import { Button, Form, Grid, Header, Image, Input, Message, Segment } from 'semantic-ui-react'


//! this form is used for user account creation and user login !//



class LoginForm extends React.Component {

  state = {
    error: false,
    fields: {
      username: "",
      password: "",
    },
  };
  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };
  
render(){

  
return (
  <div id="outer-login">
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>

      <Form size='large' onSubmit={() => this.props.onSubmit(this.state.fields)}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name={"username"} onChange={this.handleChange}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            name={"password"}
            onChange={this.handleChange}

          />

          <Button fluid size='large' >
            {this.props.loginPage ?
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
}

export default LoginForm;