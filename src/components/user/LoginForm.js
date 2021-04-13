import React from "react";
import { Field, reduxForm } from "redux-form";

LoginForm = () => {
  return (
    <form
      onSubmit={this.props.handleSubmit(this.onSubmit)}
      className="ui form error"
    >
      <Field name="username" component={this.renderInput} label={"Enter Username"} />
      <Field
        name="password"
        component={this.renderInput}
        label={"Enter Password"}
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
  
};

renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
}

renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""} `;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} />
      {this.renderError(meta)}
    </div>
  
  );
};

onSubmit = (formValues) => {
  this.props.onSubmit(formValues)
};


const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "You must enter a username";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
};


export default reduxForm({
  form: "loginForm",
  validate
})(LoginForm);
