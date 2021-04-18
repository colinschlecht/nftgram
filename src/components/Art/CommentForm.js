import React from "react";
import { Form, Field } from "react-final-form";
import { TextArea } from "semantic-ui-react";

//! this form is used for user account creation and user login !//

export class CommentForm extends React.Component {
  //   renderError({ error, touched }) {
  //     if (touched && error) {
  //       return (
  //         <div className="ui error message">
  //           <div className="header">{error}</div>
  //         </div>
  //       );
  //     }
  //   }

    renderInput = ({ input, meta }) => {
      const className = `field ${meta.error && meta.touched ? "error" : ""} `;
      return (
        <div className={className}>
          <input {...input} />
          {/* {this.renderError(meta)} */}
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
              <Field name="comment">
                {(props) => (
                  <>
                    <TextArea
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                    <button type="submit">Submit</button>
                  </>
                )}
              </Field>
            </form>
          )}
        </Form>
      </div>
    );
  }
}
