import React from "react";
import { Form, Field } from "react-final-form";

class LoginForm extends React.Component {
  renderError({ error, touched }) {
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

  render() {
    const required = (value) => (value ? undefined : "Required");
    const { onSubmit } = this.props;
    return (
      <div>
        <Form onSubmit={onSubmit}>
          {(props) => (
            <form
              onSubmit={(e) => props.handleSubmit(e)}
              className="ui form error" 
            >
              <Field
                name="username"
                component={this.renderInput}
                label={"Enter Username"}
                validate={required}
              />
              <Field
                name="password"
                component={this.renderInput}
                label={"Enter Password"}
                validate={required}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default LoginForm;
