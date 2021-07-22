import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Icon, Input } from "semantic-ui-react";
import { updateUserAdmin } from "../../actions";

const TableRow = ({ user, fields }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const [userState, setUserState] = useState(user);

  const editAndCancel = (e) => {
    e.preventDefault();
    setUserState(user);
    setEditing(!editing);
  };

  const confirmEdit = (e) => {
    e.preventDefault();
    setEditing(!editing);
    dispatch(updateUserAdmin(user.id, {...userState}))
  };

  const handleChange = (e, field) => {
    const newUser = { ...userState };
    newUser[field] = e.target.value;
    setUserState(newUser);
  };

  return (
    <Table.Row key={`row-for${user.id}${editing}`}>
      <Table.Cell key={`edit-cell${user.id}`} className="edit-cell">
        {editing ? (
          <>
            <Icon
              key={`confirm${user.id}`}
              name="check"
              className="link-text"
              onClick={(e) => confirmEdit(e)}
            ></Icon>
            <Icon
              key={`cancel${user.id}`}
              name="cancel"
              onClick={(e) => editAndCancel(e)}
            ></Icon>{" "}
          </>
        ) : (
          <Icon
            key={`edit${user.id}`}
            name="edit"
            onClick={(e) => editAndCancel(e)}
          ></Icon>
        )}
      </Table.Cell>

      {editing
        ? Object.keys(fields).map(
            (field, index) =>
              fields[field] && (
                <Table.Cell
                  key={`editing-cell${user.id}${field}${index}${user[field]}`}
                >
                  <Input
                    id={`admin-input${user.id}${field}${index}${user[field]}`}
                    key={`editing-input${user.id}${field}${index}${user[field]}`}
                    value={`${userState[field]}`}
                    onChange={(e) => handleChange(e, field)}
                  />
                </Table.Cell>
              )
          )
        : Object.keys(fields).map(
            (field, index) =>
              fields[field] && (
                <Table.Cell
                  key={`viewing ${user.id}${index}`}
                >{`${userState[field]}`}</Table.Cell>
              )
          )}
    </Table.Row>
  );
};

export default TableRow;
