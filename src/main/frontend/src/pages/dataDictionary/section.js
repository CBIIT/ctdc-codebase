/* eslint-disable */

import React from "react";

export default function Section({ data }) {
  return (
      <div className="section-content" id={data.row[0].charAt(0).toUpperCase()}>
        <p>Attribute Name: {data.row[0]}</p>
        <p>Description: {data.row[1]}</p>
        <p>ATTRIBUTE OF NODE/RELATIONSHIP: {data.row[2]}</p>
        <p>Display Name: {data.row[3]}</p>
        <p>Required: {data.row[4]}</p>
        <p>Type: {data.row[5]}</p>
        <p>Constraints: {data.row[6]}</p>
        <p>Enumeration: {data.row[7]}</p>
      </div>
  );
}