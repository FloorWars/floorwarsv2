import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, Collapse, DatePicker, Divider, Input, List, Progress, Slider, Spin, Steps, Switch, Layout, Menu, Breadcrumb } from "antd";
import React, { useState } from "react";
import { Address, Balance, BoredPunksApp, SwapInfo } from "../components";
import { useContractReader } from "eth-hooks"
import "../BoredPunks.css"

const { Header, Content, Footer } = Layout;
const { Step } = Steps;
const { Panel } = Collapse;

export default function BoredPunks({
  address,
  price,
  usdcBalance,
  longBalance,
  shortBalance,
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
       <Collapse defaultActiveKey={['1']} >
         <Panel header="Steps to create a synthetic position on CryptoPunks" key="1">
           <Steps direction="vertical" current={0}>
             <Step title="Create Position" description="Lock up collateral (USDC)to mint long and short synth tokens representing a covered call option." />
             <Step title="Sell Tokens" description="Take a long or short position by selling tokens to speculators. No need to worry about liquidation as positions are always fully collateralized." />
             <Step title="Redeem" description="After expiry, redeem remaining or purchased tokens for collateral." />
           </Steps>
         </Panel>
       </Collapse>

       <div className="site-layout-content">
          <BoredPunksApp address={address} price={price} tx={tx} readContracts={readContracts} writeContracts={writeContracts} usdcBalance={usdcBalance} longBalance = {longBalance} shortBalance = {shortBalance}/>
         <SwapInfo tx={tx} readContracts={readContracts} writeContracts={writeContracts} />
       </div>
     </Content>
   </Layout>




  );
}
