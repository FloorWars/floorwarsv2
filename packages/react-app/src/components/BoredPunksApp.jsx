import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Row, Col, Divider, Layout, List, Menu, Breadcrumb, Typography, Space } from "antd";
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
           <Divider >Product Info</Divider>
           <List itemLayout="horizontal" dataSource={[
             {descr: 'Synth Token Pair Name', content: 'USD / Decile FloorWars CryptoPunks Covered Call' },
             {descr: 'Strike Price (inverted)', content: `${strike} ${collateralCurr}`},
             {descr: 'Expiry', content: expiry}, 
             {descr: 'Collateral', content: collateralCurr}, 
             ]}
             renderItem={item => (
               <List.Item>
                 <List.Item.Meta description={item.descr} />
                  {item.content}
               </List.Item>
             )}
           />
           <Divider >Live Price Data</Divider>
           <List itemLayout="horizontal" dataSource={[
             {descr: 'Total Collateral Locked', content: `${tvl} ${collateralCurr}`}, 
             {descr: 'Last ETHUSD Price', content: ethPrice}, 
             {descr: 'Last USDfw10PUNK Price', content: price}, 
             {descr: 'Last fw10PUNKUSD Price', content: Math.round(1/price)}, 
             {descr: 'Last Long Token Value in Collateral', content: longCollateralValue}, 
             ]}
             renderItem={item => (
               <List.Item>
                 <List.Item.Meta description={item.descr} />
                  {item.content}
               </List.Item>
             )}
           />
         </div>

       </Col>

       <Col span={8}>
          <BoredPunksPosition tx = {props.tx} address = {props.address} readContracts = {props.readContracts} writeContracts = {props.writeContracts} usdcBalance = {props.usdcBalance} longBalance = {props.longBalance} shortBalance = {props.shortBalance}/>
       </Col>
      </Space>
    </Row>




  );

}
