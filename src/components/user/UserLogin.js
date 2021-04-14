import React from "react";
import { connect } from "react-redux"
import LoginForm from "./LoginForm"
import { loginUser } from "../../actions";

class UserLogin extends React.Component {

  onSubmit = async (formValues) =>  {
    console.log(formValues)
    await this.props.loginUser(formValues).then((res) => {
      console.log(res)
      if (res.status === 202) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { loginUser })(UserLogin);


