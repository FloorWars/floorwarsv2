import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Row, Col, Layout, Menu, Breadcrumb, Typography, Space } from "antd";
import "./BoredPunks.css";
import BoredPunksPosition from "./BoredPunksPosition";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksApp(props) {

  const expiry = 'December 31, 2021';
  const collateralCurr = 'USDC';
  const tvl = '123123';

  const [price, setPrice] = useState(0);
 
  useEffect(async () => {
    const result = await fetch( '/demoprice.json');
    const newPrice = await result.json();
    setPrice(parseFloat(newPrice.USDfl10PUNK));
  }, []);

  return (

    <Row justify="center">

      <Space>
       <Col span={7}>

         <div className="ProductDiv">
          <Title level = {5}>Product: kUSDfw10PUNKc700-1221 </Title>
          <Text strong>Full Name: long kilo-USD short Decile FloorWars CryptoPunks Covered Call 700 Strike Exp. 12/2021</Text>
          <br></br>
          <br></br>
          <Text strong>Expiration: {expiry}</Text>
          <br></br>
          <Text strong>Collateral: {collateralCurr}</Text>
          <br></br>
          <Text strong>Total Collateral Locked: {tvl} {collateralCurr}</Text>
          <br></br>
          <Text strong>Last USDfl10PUNK Price: {price}</Text>
          <br></br>
          <Text strong>Last fl10PUNKUSD Price: {Math.round(1/price)}</Text>
          <br></br>
          <Text strong>Total L/S tokens outstanding: 1000</Text>
         </div>

       </Col>

       <Col span={8}>
          <BoredPunksPosition tx = {props.tx} address = {props.address} readContracts = {props.readContracts} writeContracts = {props.writeContracts} usdcBalance = {props.usdcBalance} />
       </Col>
      </Space>
    </Row>




  );

}
