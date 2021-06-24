import React from "react";
import { Form, Field } from "react-final-form";
import { TextArea } from "semantic-ui-react";

//! this form is used for user account creation and user login !//

export const CommentForm = (props) => {
  const { onSubmit, art, commentType, comment } = props;
  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values, reset }) => (
          <form onSubmit={(e) => {
            handleSubmit(e)
            form.reset()
            }} className="ui form error">
            <Field name="comment">
              {(props) => (
                <>
                  {commentType === "Art" ? (
                    <>
                      <TextArea
                        value={props.input.value}
                        onChange={props.input.onChange}
                        placeholder={`Reply to @${art.user.username}`}
                      />
                    </>
                  ) : (
                    <>
                      <TextArea
                        value={props.input.value}
                        onChange={props.input.onChange}
                        placeholder={`Reply to @${comment.user.username}`}
                      />
                    </>
                  )}
                </>
              )}
            </Field>
          </form>
        )}
      />
    </>
  );
};
