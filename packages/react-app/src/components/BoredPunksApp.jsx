import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Row, Col, Layout, Menu, Breadcrumb, Typography, Space } from "antd";
import "./BoredPunks.css";
import BoredPunksPosition from "./BoredPunksPosition";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksApp(props) {

  // pairName()
  // const pairName = "USDfw10PUNK Covered Call Token Pair December 2021";
  // expirationTimestamp()
  const expiry = 'December 31, 2021';
  const collateralCurr = 'USDC';
  const strike = '800000';
  const tvl = '123123'; // TODO
  const ethPrice = props.price ? (props.price == 1 ? 3500 : props.price) : 3500; // XXX $1 on Mumbai
  // longToken() = 0xf497360850367A9F17738392f48080f951959e8C
  // shortToken() = 0x9189a9BEFa7E0799d2470b49948588C14B7A1036

  const [price, setPrice] = useState(0);

  const longCollateralValue = (price - 1/parseFloat(strike))/(price);

  useEffect(async () => {
    const result = await fetch( '/demoprice.json');
    const newPrice = await result.json();
    // setPrice(parseFloat(newPrice.USDfl10PUNK));
    // use ETH price and convert
    setPrice(1/ethPrice * parseFloat(newPrice.ETHfl10PUNK));

  }, []);

  return (

    <Row justify="center">

      <Space>
       <Col span={7}>

         <div className="ProductDiv">
          <Title level = {5}>Product: USDfw10PUNKc800000-1221 </Title>
          <Text strong>Full Name: USD / Decile FloorWars CryptoPunks Covered Call </Text>
          <br></br>
          <Text strong>Strike Price (inverse): {strike}</Text>
          <br></br>
          <Text strong>Expiration: {expiry}</Text>
          <br></br>
          <Text strong>Collateral: {collateralCurr}</Text>
          <br></br>
          <Text strong>Total Collateral Locked: {tvl} {collateralCurr}</Text>
          <br></br>
          <Text strong>Last ETHUSD Price: {ethPrice}</Text>
          <br></br>
          <Text strong>Last USDfl10PUNK Price: {price}</Text>
          <br></br>
          <Text strong>Last fl10PUNKUSD Price: {Math.round(1/price)}</Text>
          <br></br>
          <Text strong>Last Long Token Collateral Value: {longCollateralValue}</Text>
          <br></br>
          <Text strong>Total L/S tokens outstanding: 1000</Text>
         </div>

       </Col>

       <Col span={8}>
          <BoredPunksPosition tx = {props.tx} address = {props.address} readContracts = {props.readContracts} writeContracts = {props.writeContracts} usdcBalance = {props.usdcBalance} longBalance = {props.longBalance} shortBalance = {props.shortBalance}/>
       </Col>
      </Space>
    </Row>




  );

}
