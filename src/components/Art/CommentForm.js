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
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={(e) => handleSubmit(e)} className="ui form error">
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
                      <button type="submit" disabled={pristine}>
                        Submit
                      </button>
                    </>
                  ) : (
                    <>
                      <TextArea
                        value={props.input.value}
                        onChange={props.input.onChange}
                        placeholder={`Reply to @${comment.user.username}`}
                      />
                      <button type="submit" disabled={pristine}>
                        Submit
                      </button>
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
