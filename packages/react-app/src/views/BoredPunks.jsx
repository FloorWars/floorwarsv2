import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, AvailableCollateral } from "../components";
import { useContractReader } from "eth-hooks"

export default function BoredPunks({
  address,
  // usdcBalance,
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
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <AvailableCollateral address = {address} />

        <h2>BoredPunks:</h2>
        <h4>Collateral Amount (USDC) :</h4>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder="Leave empty to mint maximum"
            onChange={e => {
              setNewAmount(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
            /* notice how you pass a call back for tx updates too */
              let modAmount
              let colPair = await readContracts.LSP.collateralPerPair()
              colPair = colPair / (10**12)

              if(amount === 0) {
                let lspAddress = readContracts.LSP.address
                let newAmount =  await readContracts.USDC.allowance(
                  address,
                  lspAddress
                )

                let balance = await readContracts.USDC.balanceOf(address)

                if(newAmount >= balance) {
                  modAmount = balance / colPair

                } else {
                  modAmount = newAmount / colPair
                }

              } else {
                modAmount = amount
              }

              modAmount *= (10**6)

              const result = tx(writeContracts.LSP.create(modAmount), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Create Synths!
          </Button>
          <Button
            onClick={() => {
              let modAmount = amount * (10**6)
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.LSP.redeem(modAmount),
              );
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Redeem
          </Button>
          <Button
            onClick={() => {
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.LSP.expire()
              );
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Expire
          </Button>

        </div>
        <span>USDC Balance: </span>

          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setLongAmount(e.target.value);
              }}
              placeholder="long amount"
            />
            <Input
              onChange={e => {
                setShortAmount(e.target.value);
              }}
              placeholder="short amount"
            />
            <Button
              style={{ marginTop: 8 }}
              onClick={async () => {
                /* look how you call setPurpose on your contract: */
                /* notice how you pass a call back for tx updates too */
                 let modLong
                 let modShort
                //
                // if (longAmount === 0) {
                //   modLong = longBalance
                // } else {
                //   modLong = longAmount * (10**6)
                // }
                // if (shortAmount ===0) {
                //   modShort = shortBalance
                // } else {
                //   modShort = shortAmount * (10**6)
                // }

                const result = tx(writeContracts.LSP.settle(modLong, modShort), update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                });
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
              }}
            >
              Settle
            </Button>
          </div>
          <span>Short Balance: </span>
          <br></br>
          <span>Long Balance: </span>
        </div>
    </div>


  );
}
