import React, { useState } from "react";
import { Checkbox, Icon } from "semantic-ui-react";

const DropMenu = ({ setFields, fields, page, location }) => {
  const [dropped, setDropped] = useState(false);

  const dropMenu = (e) => {
    e.preventDefault();
    setDropped(!dropped);
  };

  const changeState = (e, option) => {
    e.preventDefault();
    let newFields = { ...fields };
    newFields[option] = !fields[option];

    setFields(newFields);
  };

  const options = Object.keys(fields).map((field, index) => (
    <>
      <div id="check-box" key={`CB_${location}_${page}_${index}_field_${field}_CB`}>
        <Checkbox
          key={`${location}_${index}_${field}_box_${page}`}
          label={field}
          checked={fields[field]}
          onChange={(e) => changeState(e, field)}
        />
      </div>
    </>
  ));

  return (
    <>
      <a className="link-text drop-icon" href="drop-options" onClick={(e) => dropMenu(e)} key={`${location}_icon-link-${dropped}`}>
        <Icon name="filter" key={`${location}_icon-${dropped}`}></Icon>
      </a>
      {dropped && 
      <div className={`outer-check-box-${dropped}`} key={`${location}_cb-container-${dropped}`}>
        <div className={`check-box-${dropped}`} key={`${location}_cb-inner-container-${dropped}`}>{options}</div>
      </div>   
      }
    </>
  );
};

export default DropMenu;
