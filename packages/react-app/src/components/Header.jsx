import { PageHeader } from "antd";
import React from "react";


// displays a page header

export default function Header() {
  return (
    <a href="https://floorwars.github.io" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title={(<img src='/logo.png' width='200' />)} 
        subTitle="Synthetic NFT Floor Derivatives"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
