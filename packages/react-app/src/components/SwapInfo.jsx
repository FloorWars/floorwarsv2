import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Button, Card, Descriptions, Divider, Row, Col, Layout, Menu, Breadcrumb, Typography, Space, Input, Select } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

const GIVEN_IN = 0
const GIVEN_OUT = 1
const LONG_TOKEN = 'Long Token';
const SHORT_TOKEN = 'Short Token';

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
  swapColAllowance,
  longBalance,
  shortBalance,
  usdcBalance,
  poolTokensLong,
  poolTokensShort,
}) {

  const [spotLong, setSpotLong] = useState(0);
  const [spotShort, setSpotShort] = useState(0);
  const [longSwapTokenIn, setLongSwapTokenIn] = useState('USDC');
  const [longSwapTokenOut, setLongSwapTokenOut] = useState(LONG_TOKEN)
  const [shortSwapChoice, setShortSwapTokenIn] = useState('USDC');
  const [shortSwapTokenOut, setShortSwapTokenOut] = useState(SHORT_TOKEN)
  const [swapLongAllowed, setSwapLongAllowed] = useState(false);
  const [swapShortAllowed, setSwapShortAllowed] = useState(false);
  const [swapColAllowed, setSwapColAllowed] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const [outAmount, setOutAmount] = useState(0);
  const [inAmount, setInAmount] = useState(0);
  const [swapRateUsdc, setSwapRateUsdc] = useState(0);

  let fColAllowance = swapColAllowance ? parseFloat(utils.formatUnits(swapColAllowance, 6)).toFixed(6) : null;
  let fLongAllowance = longAllowance ? parseFloat(utils.formatUnits(longAllowance, 6)).toFixed(6) : null;
  let fShortAllowance = shortAllowance ? parseFloat(utils.formatUnits(shortAllowance, 6)).toFixed(6) : null;
  let fLongBalance = longBalance ? parseFloat(utils.formatUnits(longBalance, 6)).toFixed(6) : null;
  let fShortBalance = shortBalance ? parseFloat(utils.formatUnits(shortBalance, 6)).toFixed(6) : null;
  let fUsdcBalance = usdcBalance ? parseFloat(utils.formatUnits(usdcBalance, 6)).toFixed(6) : null;
  let longPoolUSDC = poolTokensLong ? parseFloat(utils.formatUnits(poolTokensLong[1][0], 6)).toFixed(6) : null;
  let longPoolLong = poolTokensLong ? parseFloat(utils.formatUnits(poolTokensLong[1][1], 6)).toFixed(6) : null;


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
    if(longSwapTokenIn === 'USDC') {
      setLongSwapTokenOut(LONG_TOKEN)
    } else {
      setLongSwapTokenOut('USDC')
    }
  }, [longSwapTokenIn])

  useEffect(async () => {
    if(longSwapTokenOut === 'USDC') {
      setLongSwapTokenIn(LONG_TOKEN)
    } else {
      setLongSwapTokenIn('USDC')
    }
  }, [longSwapTokenOut])

  useEffect(async () => {
    if(inAmount === '' || inAmount === '0' || inAmount === '0.' || inAmount === '.' || inAmount === '.0') {
      setOutAmount(0)
      setSwapRateUsdc(0)
    } else {
      let poolTotalBalance = longPoolUSDC * longPoolLong
      poolTotalBalance = parseFloat(poolTotalBalance).toFixed(6)

      if(longSwapTokenIn === 'USDC') {
        let poolLongBalance = longPoolLong

        let poolUsdcBalance = parseFloat(longPoolUSDC).toFixed(6)
        let usdcBalanceAfterIn = parseFloat(poolUsdcBalance) + parseFloat(inAmount)
        usdcBalanceAfterIn = parseFloat(usdcBalanceAfterIn).toFixed(6)

        let outAmountLong = poolTotalBalance / usdcBalanceAfterIn

        outAmountLong = outAmountLong - poolLongBalance
        outAmountLong *= (-1)
        outAmountLong = parseFloat(outAmountLong).toFixed(6)
        setOutAmount(outAmountLong)
        let usdcRate = parseFloat(inAmount) / outAmountLong
        usdcRate = parseFloat(usdcRate).toFixed(6)
        setSwapRateUsdc(usdcRate)
      } else {
        let poolUsdcBalance = longPoolUSDC
        let poolLongBalance = parseFloat(longPoolLong).toFixed(6)
        let longBalanceAfterIn = parseFloat(poolLongBalance) + parseFloat(inAmount)
        longBalanceAfterIn = parseFloat(longBalanceAfterIn).toFixed(6)

        let outAmountUsdc = poolTotalBalance / longBalanceAfterIn
        outAmountUsdc = outAmountUsdc - poolUsdcBalance
        outAmountUsdc *= (-1)
        outAmountUsdc = parseFloat(outAmountUsdc).toFixed(6)
        setOutAmount(outAmountUsdc)
        let usdcRate = outAmountUsdc / parseFloat(inAmount)
        usdcRate = parseFloat(usdcRate).toFixed(6)
        setSwapRateUsdc(usdcRate)
      }
    }

  }, [inAmount, longSwapTokenIn])

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
           <Descriptions title={LONG_TOKEN + " / USDC"} bordered>
             <Descriptions.Item label="Spot Rate">{spotLong}</Descriptions.Item>
           </Descriptions>
           <Input.Group>
             <div style={{margin:20}}>
               <Input style={{ width: '75%' }} value = {inAmount} type="float" onChange={e => {
                 setInAmount(e.target.value)

                 if(e.target.value === '' || e.target.value === '0') {
                   setOutAmount(0)
                 }
               }}/>
               <span>{longSwapTokenIn}</span>
             </div>
             <div>
               <Button onClick={() => { setLongSwapTokenIn(longSwapTokenOut); setLongSwapTokenOut(longSwapTokenIn); } } >Switch {(<ArrowUpOutlined />)}{(<ArrowDownOutlined />)}</Button>
               <span>USDC per LONG: {swapRateUsdc}</span>
             </div><div style={{margin:20}}>

               <Input style={{ width: '75%' }} value= {outAmount} />
               <span>{longSwapTokenOut}</span>
             </div>

          </Input.Group>
           <Button type="primary" onClick={async () => {
              let result
              let colResult
              let tokenInAddress
              let tokenOutAddress
              let swapBalance
              let longAddress = readContracts && readContracts.LONG && readContracts.LONG.address ? readContracts.LONG.address : "0x0"
              let vaultAddress = readContracts && readContracts.BalancerVault && readContracts.BalancerVault.address ? readContracts.BalancerVault.address : "0x0";
              let colAddress = readContracts && readContracts.USDC && readContracts.USDC.address ? readContracts.USDC.address : "0x0";
              let formattedInAmount = utils.formatEther(inAmount, 6)
              if(longSwapTokenIn === 'USDC') {
                tokenInAddress = colAddress
                tokenOutAddress = longAddress
                swapBalance = fUsdcBalance
              } else {
                tokenInAddress = longAddress
                tokenOutAddress = colAddress
                swapBalance = fLongBalance
              }

              if(swapBalance < inAmount) {
                window.alert("Swap amount exceeds balance, please enter a valid amount")
              } else {
                setShowSpin(true);
                if(!swapLongAllowed && !swapColAllowed) {
                   result = await tx(writeContracts.LONG.approve(-1, vaultAddress))
                   colResult = await tx(writeContracts.USDC.approve(-1, vaultAddress))
                   .then((e) => setShowSpin(false))
                } else if(!swapColAllowed) {
                  result = await tx(writeContracts.USDC.approve(-1, vaultAddress))
                  .then((e) => setShowSpin(false))
                } else if(!swapLongAllowed) {
                  result = await tx(writeContracts.LONG.approve(-1, vaultAddress))
                  .then((e) => setShowSpin(false))
                }

                if(longSwapTokenIn === 'USDC') {
                  tokenInAddress = colAddress
                  tokenOutAddress = longAddress
                } else {
                  tokenInAddress = longAddress
                  tokenOutAddress = colAddress
                }

                const limit = (Date.now()) / 1000 + 3600;
                const swap = new SingleSwap(longPool, GIVEN_IN, tokenInAddress, tokenOutAddress, utils.formatEther(swapAmount,6))
                const fundManagement = new FundManagement(address, false, address, false)
              }





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
