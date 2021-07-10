import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Button, Input, Icon, Label, List } from "semantic-ui-react";
import { getSales } from "../actions";
import { getSaleSummary } from "./SaleInteract";

import web3 from "./web3";

///admin/contracts/query

const ContractQuery = () => {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.sales.sales);

  const [contract, setContract] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e, value) => {
    e.preventDefault();
    if (error) setError("");
    setContract(value);
  };

  const handleSummaryQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getSaleSummary(contract);
      console.log(res);
      setLoading(false);
      setSummary(res);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  return (
    <>
      <Segment attached="top" className="modal-cap ui block header">
        <span className="modal-title"> Contract Details</span>
      </Segment>
      <Segment attached="bottom" className="modal-body" id="modal-card">
        <div className="modal-content-image-segs">
          <Segment
            className="image-holder title-seg ui block header modal-cap"
            attached="top"
          >
            <span className="modal-title"> Sale Contracts </span>
          </Segment>
          <Segment attached className="admin contract-holder">
            <List className={"admin contract-list"}>
              {contracts.map((c, index) => (
                <List.Item key={index}>
                  {" "}
                  {index + 1}. {c.contract} {c.status} {" "}
                </List.Item>
              ))}
            </List>
          </Segment>
          <Segment
            attached="bottom"
            className="image-holder footer-seg ui block header modal-cap"
          ></Segment>
        </div>
        <br />

        <div className="modal-content-image-segs">
          <Segment
            className="image-holder title-seg ui block header modal-cap"
            attached="top"
          >
            <span className="modal-title"> Summary: </span>
          </Segment>
          <Segment attached className="image-holder outer-seg">
            {error && <p> {error}</p>}
            {summary && (
              <List>
                <List.Item>Contract: {summary[0]}</List.Item>
                <List.Item>Poster: {summary[1]}</List.Item>
                <List.Item>Token Addr: {summary[2]}</List.Item>
                <List.Item>Token ID: {summary[3]}</List.Item>
                <List.Item>Price: {web3.utils.fromWei(summary[4])}</List.Item>
                <List.Item>
                  Status: {web3.utils.hexToAscii(summary[5])}
                </List.Item>
              </List>
            )}
          </Segment>

          <Segment
            attached="bottom"
            className="image-holder footer-seg ui block header modal-cap"
          >
            <span className="modal-title"></span>
          </Segment>
        </div>

        <div className="modal-price-form segment-container">
          <Segment
            attached="top"
            className="ui block header modal-price-form heading modal-cap"
          >
            <span className="modal-title">Set Contract</span>
          </Segment>
          <Segment attached="bottom" className="modal-price-form body">
            <Input
              labelPosition="right"
              type="text"
              placeholder="Contract"
              className="sale-value-input"
              onChange={(e) => handleChange(e, e.target.value)}
            >
              <Label basic id="modal-price-label">
                <Icon name="ethereum" id="modal-price-logo"></Icon>
              </Label>
              <input />
              <Label id="modal-price-logo">ETH</Label>
            </Input>
          </Segment>
        </div>
        <div className="modal-price-form buttons-area">
          <Button
            icon
            labelPosition="left"
            disabled={!!!contract}
            loading={loading}
            onClick={(e) => handleSummaryQuery(e)}
          >
            <Icon name="check" />
            Summary
          </Button>
        </div>
      </Segment>
    </>
  );
};

export default ContractQuery;
