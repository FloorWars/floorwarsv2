import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch, Layout, Menu, Breadcrumb } from "antd";
import React, { useState } from "react";
import { Address, Balance, BoredPunksApp } from "../components";
import { useContractReader } from "eth-hooks"
import "../BoredPunks.css"

const { Header, Content, Footer } = Layout;

export default function BoredPunks({
  address,
  price,
  usdcBalance,
  // longBalance,
  // shortBalance,
  tx,
  mainnetProvider,
  readContracts,
  writeContracts,
}) {
  const [amount, setNewAmount] = useState(0);
  // const [longAmount, setLongAmount] = useState(0);
  // const [shortAmount, setShortAmount] = useState(0);

  // const formattedLong = longBalance / (10**6)
  // const formattedShort = shortBalance / (10**6)
  // const formattedBalance = usdcBalance / (10**6)


  return (

    <Layout className="layout">
     <Header>


     </Header>
     <Content style={{ padding: '0 50px' }}>

       <div className="site-layout-content">
          <BoredPunksApp address={address} price={price} tx={tx} readContracts={readContracts} writeContracts={writeContracts} usdcBalance={usdcBalance} />
       </div>
     </Content>
   </Layout>




  );
}
