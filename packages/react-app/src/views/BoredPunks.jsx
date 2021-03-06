import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, Col, Collapse, DatePicker, Divider, Input, InputNumber, List, Progress, Row, Slider, Spin, Steps, Switch, Typography, Layout, Menu, Breadcrumb } from "antd";
import React, { useState } from "react";
import { Address, Balance, BoredPunksApp, SwapInfo } from "../components";
import { useContractReader } from "eth-hooks"
import "../BoredPunks.css"

const { Header, Content, Footer } = Layout;
const { Step } = Steps;
const { Panel } = Collapse;
const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunks({
  address,
  price,
  usdcBalance,
  longBalance,
  shortBalance,
  pairsMinted,
  colAllowance,
  longAllowance,
  shortAllowance,
  swapColAllowance,
  longPool,
  shortPool,
  poolTokensLong,
  poolTokensShort,
  tx,
  mainnetProvider,
  readContracts,
  writeContracts,
}) {
  // const [longAmount, setLongAmount] = useState(0);
  // const [shortAmount, setShortAmount] = useState(0);

  // const formattedLong = longBalance / (10**6)
  // const formattedShort = shortBalance / (10**6)
  // const formattedBalance = usdcBalance / (10**6)

  const [slideAmount, setSlideAmount] = useState(400000);

  return (

    <Layout className="layout">
     <Header>
       <h1 style={{color:'white'}}>FloorWars Synthetics - USD vs CryptoPunks Decile Floor</h1>
     </Header>
     <Content style={{ padding: '0 50px' }}>
       <div className="site-layout-content">
         <Typography>
           <Title level={3}>USDfw10PUNKc800-1221 : CryptoPunks Floor Call Options</Title>
           <Paragraph>
             <code>USDfw10PUNKc800-1221</code> is a covered call option on USD versus the Decile Floor CryptoPunks index price converted from ETH to USD. Token pairs are minted and collateralized by 1 USDC and represent 1 USDC worth of risk versus the price of USD in fw10PUNK at expiry. Long tokens expire worthless if more than $800,000 USDC is needed for 1 theoretical "fw10PUNK" otherwise are valued at the difference proportionate to the expiry price. For example, if fw10PUNKUSD (the inverse price) settles at $400,000 on December 31st, each long token will be worth: <code>(1/200000 - 1/800000)/(1/200000) = 0.75</code> so $0.75 USDC per token. Short tokens are worth the remainder of the $1 of collateral, e.g. <code>1 - 0.75 = 0.25</code> so $0.25.
           </Paragraph>
           <Paragraph>Let's simulate how the long token settles as the USD price of 1 fw10PUNK changes.
           </Paragraph>
           <Row>
             <Col span={12}>
               <Slider
                 min={1}
                 max={800000}
                 onChange={setSlideAmount}
                 value={typeof slideAmount === 'number' ? slideAmount : 1}
               />
             </Col>
             <Col span={4}>
               <InputNumber
                 min={1}
                 max={800000}
                 style={{ margin: '0 16px' }}
                 value={slideAmount}
                 onChange={setSlideAmount}
               />
             </Col>
            <Paragraph>1 Long token is worth: { (1/slideAmount - 1/800000)/(1/slideAmount) } of $1 collateral</Paragraph>
           </Row>
         </Typography>
         <Collapse defaultActiveKey={['1']} >
           <Panel header="Steps to create a synthetic position on CryptoPunks" key="1">
             <Steps direction="vertical" current={0}>
               <Step title="Create Position" description="Lock up collateral (USDC)to mint long and short synth tokens representing a covered call option." />
               <Step title="Sell Tokens" description="Take a long or short position by selling tokens to speculators. No need to worry about liquidation as positions are always fully collateralized." />
               <Step title="Redeem" description="After expiry, redeem remaining or purchased tokens for collateral." />
             </Steps>
           </Panel>
         </Collapse>

          <BoredPunksApp address={address} price={price} tx={tx} readContracts={readContracts} writeContracts={writeContracts}
           usdcBalance={usdcBalance} longBalance = {longBalance} shortBalance = {shortBalance} pairsMinted = {pairsMinted}
           colAllowance={colAllowance}/>
         <SwapInfo tx={tx} readContracts={readContracts} writeContracts={writeContracts} longPool={longPool} shortPool={shortPool}
           address={address} longAllowance={longAllowance} shortAllowance={shortAllowance} swapColAllowance={swapColAllowance}
           longBalance={longBalance} shortBalance={shortBalance} usdcBalance={usdcBalance} poolTokensLong={poolTokensLong} poolTokensShort={poolTokensShort}/>
       </div>
     </Content>
   </Layout>




  );
}
