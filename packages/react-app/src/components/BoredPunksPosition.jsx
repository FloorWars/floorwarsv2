import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Typography, Row, Col, Button, Space, Input, Spin } from "antd";
import "./BoredPunks.css";

const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksPosition(props) {
  const [createAmount, setCreateAmount] = useState();
  const [showSpan, setShowSpan] = useState();
  const [showSpin, setShowSpin] = useState();
  const [maxRedeem, setMaxRedeem] = useState();
  const [redeemAmount, setRedeemAmount] = useState();
  const [redeemVal, setRedeemVal] = useState();

  let address = props.address;
  let colBalance = props.usdcBalance ? utils.formatUnits(props.usdcBalance, 6) : 0;
  let longBalance = props.longBalance ? parseFloat(utils.formatUnits(props.longBalance, 6)) : 0;
  let shortBalance = props.shortBalance ? parseFloat(utils.formatUnits(props.shortBalance, 6)) : 0;
  let pairsMinted = props.pairsMinted ? utils.formatUnits(props.pairsMinted, 6) : 0;
  let colAllowance = props.colAllowance ? utils.formatUnits(props.colAllowance, 6) : 0;

  useEffect(() => {
    let maxiMint
    if(parseFloat(colAllowance) > parseFloat(colBalance)) {
      maxiMint = colBalance
      setShowSpan(true)
    } else {
      maxiMint = colAllowance
      setShowSpan(false)
    }
    setCreateAmount(maxiMint)

  }, [colBalance, colAllowance]);

  useEffect(() => {
    let maxRedeem;
    if(longBalance > shortBalance) {
        maxRedeem = shortBalance
      } else {
        maxRedeem = longBalance
      }
    setMaxRedeem(maxRedeem)
    setRedeemVal(maxRedeem)
  }, [shortBalance, longBalance])


  return (
    <div className="BoredPunksPosition">
        <Row justify="center">
          <Col span = {12}>
            <Text strong>Your Wallet Balance</Text>
            <br></br>
            <br></br>
            <Text strong>Collateral(USDC):</Text>
            <br></br>
            <Text strong>Long Tokens:</Text>
            <br></br>
            <Text strong>Short Tokens:</Text>
            <br></br>
            <br></br>
            <Text>Available allowance: {colAllowance}</Text>
            <Input value={createAmount} type="float" onChange={e => {
              setCreateAmount(e.target.value)

              if(parseFloat(e.target.value) > parseFloat(colAllowance)) {
                setShowSpan(true)
              } else {
                setShowSpan(false)
              }
              if(e.target.value === '') {
                setShowSpan(false)
              }

            }} />
            <Button type="primary"
              onClick={async () => {
                if(!showSpan) {
                  if(createAmount <= 0) {
                    window.alert("Enter a value to get approval or create")
                  } else {
                    setShowSpin(true)

                    const result = await props.tx(props.writeContracts.LSP.create(utils.parseUnits(createAmount, 6)))
                    .then((e) => setShowSpin(false))
                  }

                } else {

                  let approvalAmount = createAmount
                  approvalAmount = utils.parseUnits(approvalAmount.toString(), 6)
                  setShowSpin(true)

                  const lspAddress = props.readContracts && props.readContracts.LSP && props.readContracts.LSP.address;
                  const resultApproval = await props.tx(props.writeContracts.USDC.approve(lspAddress, approvalAmount))
                  .then((e) => setShowSpin(false))

                }

              }}
                block>{showSpan ? (showSpin ? <Spin /> : "Approve") : (showSpin ? <Spin /> : "Create")}</Button>
          </Col>
          <Col span ={12}>
            <br></br>
            <br></br>
            <Text strong>{colBalance}</Text>
            <br></br>
            <Text strong>{longBalance}</Text>
            <br></br>
            <Text strong>{shortBalance}</Text>
            <br></br>
            <br></br>
            <Text>Max redeem amount: {maxRedeem}</Text>
            <Input type="float" value={redeemVal} onChange={e => {
              setRedeemVal(e.target.value)
            }}></Input>
            <Button type="primary"
              onClick={async () => {
                if(redeemVal > maxRedeem || redeemVal <= 0) {
                  window.alert("Select a valid redeem amount")
                } else {
                  setShowSpin(true)
                  const result = await props.tx(props.writeContracts.LSP.redeem(utils.parseUnits(redeemVal.toString(), 6)))
                  .then((e) => setShowSpin(false))
                }
              }}
            danger>
              { showSpin ? <Spin /> : "Redeem" }
            </Button>
              <Button type="primary">  { showSpin ? <Spin /> : "Settle" }</Button>
          </Col>
        </Row>
    </div>



  );
}
