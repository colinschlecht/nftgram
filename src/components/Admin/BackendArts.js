import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // Segment,
  // Button,
  // Input,
  Icon,
  Menu,
  Table,
} from "semantic-ui-react";
import { getSales, fetchArts } from "../../actions";
import TableRow from "./TableRow";
import DropMenu from "./DropMenu";

// import web3 from "../../utils/web3";

///admin/contracts/query

const BackendArts = () => {
  const dispatch = useDispatch();

  const allArts = useSelector((state) => state.art.arts[0]);
  const [pages, setPages] = useState("");
  const [page, setPage] = useState(1);

  const [fields, setFields] = useState({
    id: true,
    user_id: true,
    artist_id: true,
    category_id: false,
    for_sale: true,
    likes: false,
    caption: false,
    cid: false,
    name: false,
    tokenURI: false,
    contract_address: false,
    tokenID: true,
    link: false,
    created_at: false,
    updated_at: false,
  });

  const setUpPages = useCallback(() => {
    const pagesObj = {};
    let L = allArts.length;
    let current = 0;
    let pg = 1;
    while (current <= L) {
      let arr = allArts.slice(current, current + 10);
      pagesObj[pg] = arr;
      pg += 1;
      current += 10;
    }
    setPages(pagesObj);
  }, [allArts]);

  useEffect(() => {
    dispatch(getSales());
    dispatch(fetchArts());
  }, [dispatch]);

  useEffect(() => {
    if (allArts) {
      setUpPages();
    }
  }, [allArts, setUpPages]);

  const changePage = (e, action) => {
    e.preventDefault();
    let min = 1;
    let max = Object.keys(pages).length;

    if (parseInt(action)) {
      setPage(parseInt(action));
    } else {
      switch (action) {
        case "PLUS":
          if (page < max) {
            setPage(page + 1);
          }
          break;
        case "MINUS":
          if (page > min) {
            setPage(page - 1);
          }
          break;
        default:
          break;
      }
    }
  };

  const shaded = (k) => (parseInt(k) === page ? "shaded" : "non-shaded");

  return (
    <>
      <DropMenu
        setFields={setFields}
        page={page}
        fields={fields}
        key={`${page}-menu-art`}
        location="arts"
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="edit-cell"> Edit</Table.HeaderCell>
            {Object.keys(fields).map(
              (field, index) =>
                fields[field] && (
                  <Table.HeaderCell key={`header ${index} ${field}`}>
                    {field}
                  </Table.HeaderCell>
                )
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pages[page] &&
            pages[page].map((art, index) => (
              <TableRow
                key={`${page}.${index}.${art.id}`}
                art={art}
                fields={fields}
              />
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={`${Object.keys(fields).length}`}>
              <Menu pagination>
                <Menu.Item as="a" icon onClick={(e) => changePage(e, "MINUS")}>
                  <Icon name="chevron left" />
                </Menu.Item>
                {Object.keys(pages).map((k) => (
                  <Menu.Item
                    className={shaded(k)}
                    key={`option ${k}`}
                    as="a"
                    onClick={(e) => changePage(e, k)}
                  >
                    {k}
                  </Menu.Item>
                ))}
                <Menu.Item as="a" icon onClick={(e) => changePage(e, "PLUS")}>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default BackendArts;
