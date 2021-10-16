import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Button, Card, Descriptions, Divider, Row, Col, Layout, Menu, Breadcrumb, Typography, Space, Input, Select } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

const GIVEN_IN = 0
const GIVEN_OUT = 1

export default function SwapInfo({
  tx,
  mainnetProvider,
  readContracts,
  writeContracts,
  longPool,
  shortPool,
  address,
  longAllowance,
  shortAllowance,
  swapColAllowance
}) {

  const [spotLong, setSpotLong] = useState(0);
  const [spotShort, setSpotShort] = useState(0);
  const [longSwapChoice, setLongSwapChoice] = useState('USDC');
  const [longSwapChoiceTwo, setLongSwapChoiceTwo] = useState('LONG')
  const [shortSwapChoice, setShortSwapChoice] = useState('USDC');
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapLongAllowed, setSwapLongAllowed] = useState(false);
  const [swapShortAllowed, setSwapShortAllowed] = useState(false);
  const [swapColAllowed, setSwapColAllowed] = useState(false);

  let fColAllowance = swapColAllowance ? parseFloat(utils.formatUnits(swapColAllowance, 6)) : null;
  let fLongAllowance = longAllowance ? parseFloat(utils.formatUnits(longAllowance, 6)) : null;
  let fShortAllowance = shortAllowance ? parseFloat(utils.formatUnits(shortAllowance, 6)) : null;

  useEffect(async () => {
    const result = await fetch( '/demoprice.json');
    const json = await result.json();
    setSpotLong(parseFloat(json.spotLong));
    setSpotShort(parseFloat(json.spotShort));

  }, []);

  useEffect(async () => {
    if(fLongAllowance > 0) {
      setSwapLongAllowed(true)
    } else {
      setSwapLongAllowed(false)
    }
  }, [fLongAllowance])

  useEffect(async () => {
    if(fShortAllowance > 0) {
      setSwapShortAllowed(true)
    } else {
      setSwapShortAllowed(false)
    }
  }, [fShortAllowance])

  useEffect(async () => {
    if(swapColAllowance > 0) {
      setSwapColAllowed(true)
    } else {
      setSwapColAllowed(false)
    }
  }, [fColAllowance])

  useEffect(async () => {
    if(longSwapChoice === 'USDC') {
      setLongSwapChoiceTwo('LONG')
    } else {
      setLongSwapChoiceTwo('USDC')
    }
  }, [longSwapChoice])

  useEffect(async () => {
    if(longSwapChoiceTwo === 'USDC') {
      setLongSwapChoice('LONG')
    } else {
      setLongSwapChoice('USDC')
    }
  }, [longSwapChoiceTwo])

  function SingleSwap(
    poolId,
    kind,
    assetIn,
    assetOut,
    amount,
    userData
  ) {
    this.poolId = poolId
    this.kind = kind
    this.assetIn = assetIn
    this.assetOut = assetOut
    this.amount = amount
    this.userData = userData
  }

  function FundManagement(
    sender,
    fromInternalBalance,
    recipient,
    toInternalBalance
  ) {
    this.sender = sender
    this.fromInternalBalance = fromInternalBalance
    this.recipient = recipient
    this.toInternalBalance = toInternalBalance
  }


  return (

    <Row justify="center">
      <Divider>Swap Long/Short Tokens</Divider>
      <Space>
        <Col span={12}>
         <Card className="SwapCard">
           <Descriptions title="Long (token) / USDC" bordered>
             <Descriptions.Item label="Spot Rate">{spotLong}</Descriptions.Item>
           </Descriptions>
           <Input.Group>
             <Input style={{ width: '72%' }} value = {swapAmount} onChange={e => {
               setSwapAmount(e.target.value)
             }}/>
             <Input style={{ width: '72%' }} />
            <Select labelInValue value={{value: longSwapChoice}} onChange={e => {
              setLongSwapChoice(e.value)

            }}>
              <Option value="USDC">USDC</Option>
              <Option value="LONG">LONG</Option>
            </Select>
            <Select labelInValue value={{value: longSwapChoiceTwo}} onChange={e => {
              setLongSwapChoiceTwo(e.value)
            }}>
              <Option value="USDC">USDC</Option>
              <Option value="LONG">LONG</Option>
            </Select>

          </Input.Group>
           <Button type="primary" onClick={async () => {
              // let result
              // if(!swapLongAllowed) {
              //   result = await tx(writeContracts.LONG.approve())
              // }
              // const limit = (Date.now()) / 1000 + 3600;
              // const swap = new SingleSwap(longPool, GIVEN_IN, )
              //
              // ))
           }}
           block>Swap</Button>
           <Button type="secondary" block>Add long-USDC Liquidity</Button>
          </Card>
         </Col>
         <Col span={12}>
         <Card>
           <Descriptions title="Short (token) / USDC" bordered>
             <Descriptions.Item label="Spot Rate">{spotShort}</Descriptions.Item>
           </Descriptions>
           <Input size="medium"></Input>
           <Input size="medium"></Input>
           <Button type="primary" block>Swap</Button>
           <Button type="secondary" block>Add short-USDC Liquidity</Button>
         </Card>
         </Col>
      </Space>
    </Row>




  );

}
