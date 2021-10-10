import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Button, Card, Descriptions, Row, Col, Layout, Menu, Breadcrumb, Typography, Space } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

export default function SwapInfo({
  tx,
  mainnetProvider,
  readContracts,
  writeContracts,
}) {

  const [spotLong, setSpotLong] = useState(0);
  const [spotShort, setSpotShort] = useState(0);
 
  useEffect(async () => {
    const result = await fetch( '/demoprice.json');
    const json = await result.json();
    setSpotLong(parseFloat(json.spotLong));
    setSpotShort(parseFloat(json.spotShort));

  }, []);

  return (

    <Row justify="center">
      <Space>
         <Card >
           <Descriptions title="Long (token) / USDC" bordered>
             <Descriptions.Item label="Spot Rate">{spotLong}</Descriptions.Item>
           </Descriptions>
           <Button type="primary" block>Swap</Button>
           <Button type="secondary" block>Add long-USDC Liquidity</Button>
         </Card>
         <Card >
           <Descriptions title="Short (token) / USDC" bordered>
             <Descriptions.Item label="Spot Rate">{spotShort}</Descriptions.Item>
           </Descriptions>
           <Button type="primary" block>Swap</Button>
           <Button type="secondary" block>Add short-USDC Liquidity</Button>
         </Card>
      </Space>
    </Row>




  );

}
