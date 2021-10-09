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


    <AvailableCollateral address = {address} />



  );
}
