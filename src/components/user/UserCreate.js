import React from "react";
import { connect } from "react-redux"
import LoginForm from "./LoginForm"
import { createUser } from "../../actions";

class UserCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createUser(formValues).then((res) => {
      if (res.status === 201) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <h3>Create an Account</h3>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createUser })(UserCreate);
