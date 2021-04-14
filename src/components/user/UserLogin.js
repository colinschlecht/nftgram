import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginUser } from "../../actions";

class UserLogin extends React.Component {

  onSubmit = async (formValues) => {
    await this.props.loginUser(formValues).then((res) => {
      localStorage.setItem("token", res.data.jwt);
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
