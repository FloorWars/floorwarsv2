import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, Collapse, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance } from "../components";
import {
  useContractReader,
} from "eth-hooks";

const { Panel } = Collapse;

  /*
    isForSale   bool :  true
  punkIndex   uint256 :  6593
  seller   address :  0x1919DB36cA2fa2e15F9000fd9CdC2EdCF863E685
  minValue   uint256 :  113500000000000000000
  onlySellTo   address :  0x0000000000000000000000000000000000000000
  */
function Offer({ offer }) {
  if (!offer) { return null }
  if (!offer[0]) { return null; }
  return (<tr>
    <td>{ offer[0] ? '✓' : '❌' }</td>
    <td>{ offer[1] ? offer[1].toNumber() : 'false' }</td>
    <td>{ offer[3] ? utils.formatEther(offer[3]) : 'false' }</td>
    <td>{ offer[4] == '0x0000000000000000000000000000000000000000' ? '✓' : '❌' }</td></tr>)
}
const _BIGTIME = 10000000000;
function OfferByTokenId({
  tokenId,
  mainnetContracts,
  onTokenLoad,
}) {
  const token = useContractReader(mainnetContracts, "CryptoPunksMarket", "punksOfferedForSale", [tokenId], /*_BIGTIME*/);
  if (token) {
    //console.log('rendering Off ', tokenId);
    onTokenLoad(token);
  }

  return (<Offer offer={token} />)
}

const localToken = (tokenId) => localStorage.getItem('cryptopunks-' + tokenId);
const setLocalToken = (isForSale, tokenId, seller, minValue, onlySellTo) => localStorage.setItem('cryptopunks-' + tokenId, `${isForSale},${tokenId},${seller},${minValue},${onlySellTo}`);

function LocalLoad({
  tokenId,
}) {
  const tokenStr = localToken(tokenId);

  return (<tr><td>LL {tokenStr}</td></tr>);
}
function PartialTokenTable({
  offset,
  tokenIds,
  mainnetContracts,
  onTokenLoad,
}) {
  const count = 1000;
  return (
    <Collapse><Panel header={'Expand to load ' + count + ' from: ' + offset}>
          <table style={{margin: 'auto'}}
            ><thead><tr><th>isForSale</th><th>tokenId</th><th>minValue</th><th>sell to 0x0</th></tr></thead
            ><tbody>{ tokenIds.slice(offset, offset+count).map(id => 
                localToken(id) !== null ? (<LocalLoad key={'ll-'+id} tokenId={id} />) :
                (<OfferByTokenId key={id} tokenId={id} mainnetContracts={mainnetContracts} onTokenLoad={onTokenLoad} />)
            ) }</tbody
          ></table>
        </Panel></Collapse>
  );
}
let counter = 0;
export default function PunkOffers({
  mainnetProvider,
  mainnetContracts,
  readContracts,
  writeContracts,
}) {
  // There are 10k CryptoPunks
  const tokenIds = [...Array(10000).keys()]; // .map(i => i + 0);
  const [newTokens, setNewTokens] = useState({});
  const [newLoadedTokenIds, setNewLoadedTokenIds] = useState({});
  const onTokenLoad = (token) => {
    const tokenId = token[1].toString();
    if (localToken(tokenId) === null) {
      setLocalToken(...token);
    }
    if (newLoadedTokenIds[tokenId] === undefined) {
      newLoadedTokenIds[tokenId] = true;
      setNewLoadedTokenIds(newLoadedTokenIds);
    }
    //console.log('counter: ', counter++);
    if (token[0] && token[4] == '0x0000000000000000000000000000000000000000') {
      if (newTokens[tokenId] !== undefined) {
        // console.log('overwriting ', token[1].toString());
      }
      newTokens[tokenId] = utils.formatEther(token[3]);
      setNewTokens(newTokens);
    } };

  const sortedOffers = Object.keys(newTokens).map(k => { return {id: k, ask: parseFloat(newTokens[k])} }).sort((a, b) => a.ask - b.ask);
  // console.log(sortedOffers);
  const floor = sortedOffers.length ? `floor: id ${sortedOffers[0].id} / ask: ${sortedOffers[0].ask}` : '...';
  const decOfferCount = Math.floor(sortedOffers.length / 10);
  const decAvg = sortedOffers.length ? sortedOffers.slice(0, decOfferCount).reduce((sum, x) => sum + x.ask, 0) / decOfferCount : '...';
  const decMedian = sortedOffers.length ? sortedOffers[Math.floor(decOfferCount / 2)].ask : '...';
  const loadedCount = Object.keys(newLoadedTokenIds).length;
  const [localOfferCount, setLocalOfferCount] = useState(0);

  const load10kLocal = () => {
    let newLocalOfferCount = localOfferCount;
    for (let i = 0; i < 10000; i++) {
      let tokenStr = localToken(i);
      if (tokenStr !== null) {
        newLocalOfferCount++;
        let token = tokenStr.split(',');
        if (newLoadedTokenIds[token[1]] === undefined) {
          newLoadedTokenIds[token[1]] = true;
        }
        if (token[0] == 'true' && token[4] == '0x0000000000000000000000000000000000000000') {
          if (newTokens[token[1]] !== undefined) {
            // console.log('overwriting ', token[1].toString());
          }
          newTokens[token[1]] = utils.formatEther(token[3]);
        }
      }
    }
    setLocalOfferCount(newLocalOfferCount);
    setNewLoadedTokenIds(newLoadedTokenIds);
    setNewTokens(newTokens);
  }

  return (
    <div>
      {/*slice(0,127).reduce((sum, x) => sum + x) / 127

        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: '80%', margin: "auto", marginTop: 64, marginBottom: 64 }}>
        <h2>PunkOffers UI:</h2>
        <div>{ mainnetContracts['CryptoPunksMarket'] === undefined ? 'CryptoPunksMarket contract failed to load, expect no data to load' : 'CryptoPunksMarket OK' }</div>
        <Button onClick={load10kLocal}>USE cached token data</Button> 
        <div>offers in localStorage: { localOfferCount }</div>
        <Collapse><Panel header="sortedOffers">{ JSON.stringify(sortedOffers) }</Panel></Collapse>
        <Collapse><Panel header="loadedTokenIds">{ Object.keys(newLoadedTokenIds).join(' ') }</Panel></Collapse>
        <div>{ loadedCount } punks loaded</div>
        <div>1st Floor: { floor }</div>
        <div>10% of offers: { decOfferCount }</div>
        <div>1st Decile Offers Mean: { decAvg }</div>
        <div>1st Decile Offers Median: { decMedian }</div>
        { [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(offset => ( <PartialTokenTable key={offset*1000} offset={offset*1000} tokenIds={tokenIds} mainnetContracts={mainnetContracts} onTokenLoad={onTokenLoad} /> )) }
        <Button onClick={() => localStorage.clear()}>ERASE localStorage cached token data</Button> 
      </div>
    </div>
  );
}
