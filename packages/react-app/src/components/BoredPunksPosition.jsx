import React, { useState } from "react";
const { utils } = require("ethers");
import { Typography, Row, Col, Button, Space } from "antd";
import "./BoredPunks.css";

const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksPosition(props) {

  let address = props.address;
  let positionTokens = [];
  let colBalance = props.usdcBalance ? utils.formatUnits(props.usdcBalance, 6) : 0;
  let longBalance = props.longBalance ? utils.formatUnits(props.longBalance, 6) : 0;
  let shortBalance = props.shortBalance ? utils.formatUnits(props.shortBalance, 6) : 0;
  let pairsMinted = props.pairsMinted ? utils.formatUnits(props.pairsMinted, 6) : 0;
  let colAllowance = props.colAllowance ? utils.formatUnits(props.colAllowance, 6) : 0;

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
            <br></br>
            <Text strong>Pairs Minted:</Text>
            <Button type="primary"
              onClick={async () => {
                const result = props.tx(props.writeContracts.LSP.create(utils.parseUnits(colAllowance, 6)))
              }}
                block>Mint L/S Tokens</Button>
            <Button block>Settle L/S Tokens</Button>
          </Col>
          <Col span ={12}>
            <br></br>
            <br></br>
            <Text strong>{colBalance}</Text>
            <br></br>
            <Text strong>{longBalance}</Text>
            <br></br>
            <Text strong>{shortBalance}</Text>
            <br></br>
            <Text strong>{pairsMinted}</Text>
            <Button type="primary"
              onClick={async () => {
                const result = props.tx(props.writeContracts.LSP.redeem(10000000))
              }}
            danger block>
              Redeem
            </Button>
          </Col>
        </Row>
    </div>



  );
}
