import React, { useState } from "react";
const { utils } = require("ethers");
import { Row, Col, Layout, Menu, Breadcrumb, Typography } from "antd";
import "./BoredPunks.css"

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksApp(props) {


  return (

    <Row>

       <Col flex={3}>
       
         <div className="productDiv">
          <Title level = {5}>Product: kUSDfw10PUNKc700-1221 </Title>
          <Text strong>Full Name: long kilo-USD short Decile FloorWars CryptoPunks Covered Call 700 Strike Exp. 12/2021</Text>
         </div>



       </Col>

       <Col flex={4}>
          <Title level = {5}> 2ND COLUMN </Title>
       </Col>

    </Row>




  );

}
