import React, { useState } from "react";

import BackendArts from "./BackendArts";
import ContractQuery from "./ContractQuery";
import Users from "./Users";

const Documentation = () => {
  const [sales, setSales] = useState(true);
  const [arts, setArts] = useState(false);
  const [users, setUsers] = useState(false);

  const handleDisplay = (e, display) => {
    e.preventDefault();
    setSales(false);
    setArts(false);
    setUsers(false);
    switch (display) {
      case "SALES":
        setSales(true);
        break;
      case "ARTS":
        setArts(true);
        break;
      case "USERS":
        setUsers(true);
        break;
      default:
        setSales(true);
    }
  };

  const setChoice = (disp) =>
    disp ? "docs-list-item focused" : "docs-list-item";

  return (
    <div id="outer-docs-container">
      <div id="main-docs-container" className="docs-main">
        <ul className="docs-bar docs-list">
          <li
            className={setChoice(sales)}
            id="SALES"
            onClick={(e) => handleDisplay(e, "SALES")}
          >
            Sales
          </li>
          <li
            className={setChoice(arts)}
            id="ARTS"
            onClick={(e) => handleDisplay(e, "ARTS")}
          >
            Arts
          </li>
          <li
            className={setChoice(users)}
            id="USERS"
            onClick={(e) => handleDisplay(e, "USERS")}
          >
            Users
          </li>
        </ul>
        <div className="docs-holder">
          <div className="inner-docs-holder">
            {sales && <ContractQuery />}
            {arts && <BackendArts />}
            {users && <Users />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
