import React, { useState, useEffect } from "react";
const { utils } = require("ethers");
import { Typography, Row, Col, Button, Space, Input, Spin } from "antd";
import "./BoredPunks.css";

const { Title, Paragraph, Text, Link } = Typography;

export default function BoredPunksPosition(props) {
  const [createAmount, setCreateAmount] = useState(0);
  const [showSpan, setShowSpan] = useState(false);
  const [maxMint, setMaxMint] = useState(0);

  let address = props.address;
  let colBalance = props.usdcBalance ? utils.formatUnits(props.usdcBalance, 6) : 0;
  let longBalance = props.longBalance ? utils.formatUnits(props.longBalance, 6) : 0;
  let shortBalance = props.shortBalance ? utils.formatUnits(props.shortBalance, 6) : 0;
  let pairsMinted = props.pairsMinted ? utils.formatUnits(props.pairsMinted, 6) : 0;
  let colAllowance = props.colAllowance ? utils.formatUnits(props.colAllowance, 6) : 0;

  useEffect(() => {
    let maxiMint
    if(colAllowance > colBalance) {
      maxiMint = colBalance
      setShowSpan(true)
    } else {
      maxiMint = colAllowance
      setShowSpan(false)
    }
    setCreateAmount(maxiMint)


  }, [colBalance, colAllowance]);




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
            <Text strong>Pairs Minted:</Text>
            <br></br>
            <Text>Available allowance: {colAllowance}</Text>
            <Input value={createAmount} onChange={e => {
              setCreateAmount(e.target.value)

              if(e.target.value > colAllowance) {
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

                  const result = await props.tx(props.writeContracts.LSP.create(utils.parseUnits(createAmount, 6)))

                } else {

                  let approvalAmount = createAmount - colAllowance
                  approvalAmount = utils.parseUnits(approvalAmount.toString(), 6)
                  const lspAddress = props.readContracts && props.readContracts.LSP && props.readContracts.LSP.address;
                  const resultApproval = await props.tx(props.writeContracts.USDC.approve(lspAddress, approvalAmount))

                }

              }}
                block>{showSpan ? "Approve" : "Create"}</Button>
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
            <Text strong>{pairsMinted}</Text>
            <br></br>
            <br></br>

            <Button type="primary"
              onClick={async () => {
                const result = props.tx(props.writeContracts.LSP.redeem(10000000))
              }}
            danger block>
              Redeem
            </Button>
              <Button type="primary" block>Settle L/S Tokens</Button>
          </Col>
        </Row>
    </div>



  );
}
