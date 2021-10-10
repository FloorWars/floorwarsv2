import React, { useState } from "react";
const { utils } = require("ethers");
import { Typography, Row, Col, Button } from "antd";
import "./BoredPunks.css";

const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksPosition(props) {

  let address = props.address;
  let positionTokens = [];
  let colBalance = props.usdcBalance ? props.usdcBalance.toString() : 0;

  console.log("my address: ", address)

  return (
    <div className="BoredPunksPosition">
      <Row justify="center">
        <Col span = {12}>
          <Text strong>Your Wallet Balance</Text>
          <br></br>
          <br></br>
          <Text strong>Collateral(USDC):</Text>
          <br></br>
          <Text strong>Long Tokens:</Text>
          <br></br>
          <Text strong>Short Tokens:</Text>
          <Button type="primary" block>Mint L/S Tokens</Button>
          <Button block>Settle L/S Tokens</Button>
        </Col>
        <Col span ={4}>
        <br></br>
        <br></br>
        <Text strong>{colBalance}</Text>
        <br></br>
        <Text strong>{positionTokens[0]}</Text>
        </Col>
        <Col span = {2}>
          <Text strong>/</Text>
          <br></br>
          <br></br>
          <Text strong>/</Text>
          <br></br>
          <Text strong>/</Text>
          <br></br>
          <Text strong>/</Text>
        </Col>
        <Col span = {6}>
          <Text strong>Position</Text>
          <br></br>
          <br></br>
          <Text strong>10</Text>
          <br></br>
          <Text strong>10 Minted</Text>
          <br></br>
          <Text strong>10 Minted</Text>
          <Button type="primary" danger block>
            Redeem
          </Button>
        </Col>
      </Row>
    </div>



  );
}
