import React from 'react';
import { withStyles } from '@material-ui/core';

const AttributeComponent = ({ classes, data }) => (
  <div className={classes.sectionContent} id={data.row[0].charAt(0).toUpperCase()}>
    <p>
      <span className={classes.attrTitle}>Attribute Name:</span>
      {data.row[0]}
    </p>
    <p>
      <span className={classes.attrTitle}>Description:</span>
      {data.row[1]}
    </p>
    <p>
      <span className={classes.attrTitle}>ATTRIBUTE OF NODE/RELATIONSHIP:</span>
      {data.row[2]}
    </p>
    <p>
      <span className={classes.attrTitle}>Display Name:</span>
      {data.row[3]}
    </p>
    <p>
      <span className={classes.attrTitle}>Required:</span>
      {data.row[4]}
    </p>
    <p>
      <span className={classes.attrTitle}>Type:</span>
      {data.row[5]}
    </p>
    <p>
      <span className={classes.attrTitle}>Constraints:</span>
      {data.row[6]}
    </p>
    <p>
      <span className={classes.attrTitle}>Enumeration:</span>
      {data.row[7]}
    </p>
  </div>
);
const styles = () => ({
  sectionContent: {
    padding: '12px',
  },
  attrTitle: {
    color: '#2C9FCA',
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default withStyles(styles)(AttributeComponent);
