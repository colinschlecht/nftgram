import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Icon, Input } from "semantic-ui-react";
import { updateArt } from "../../actions";

const TableRow = ({ art, fields }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const [artState, setArtState] = useState(art);

  const editAndCancel = (e) => {
    e.preventDefault();
    setArtState(art);
    setEditing(!editing);
  };

  const confirmEdit = (e) => {
    e.preventDefault();
    setEditing(!editing);
    dispatch(updateArt(art.id, {...artState}))
  };

  const handleChange = (e, field) => {
    const newArt = { ...artState };
    newArt[field] = e.target.value;
    setArtState(newArt);
  };

  return (
    <Table.Row key={`row-for${art.id}${editing}`}>
      <Table.Cell key={`edit-cell${art.id}`} className="edit-cell">
        {editing ? (
          <>
            <Icon
              key={`confirm${art.id}`}
              name="check"
              className="link-text"
              onClick={(e) => confirmEdit(e)}
            ></Icon>
            <Icon
              key={`cancel${art.id}`}
              name="cancel"
              onClick={(e) => editAndCancel(e)}
            ></Icon>{" "}
          </>
        ) : (
          <Icon
            key={`edit${art.id}`}
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
                  key={`editing-cell${art.id}${field}${index}${art[field]}`}
                >
                  <Input
                    id={`admin-input${art.id}${field}${index}${art[field]}`}
                    key={`editing-input${art.id}${field}${index}${art[field]}`}
                    value={`${artState[field]}`}
                    onChange={(e) => handleChange(e, field)}
                  />
                </Table.Cell>
              )
          )
        : Object.keys(fields).map(
            (field, index) =>
              fields[field] && (
                <Table.Cell
                  key={`viewing ${art.id}${index}`}
                >{`${artState[field]}`}</Table.Cell>
              )
          )}
    </Table.Row>
  );
};

export default TableRow;
