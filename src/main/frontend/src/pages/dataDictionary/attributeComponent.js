import React from 'react';
import { withStyles } from '@material-ui/core';

const AttributeComponent = ({ classes, data }) => (
  <div className={classes.sectionContent} id={data.row[0].charAt(0).toUpperCase()}>
    <div className={classes.attributeContent}>
      Attribute Name:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[0]}
      </span>
    </div>
    <div className={classes.attributeContent}>
    Display Name:
      <span className={classes.boldAttrDesc}>
      &nbsp;
        {data.row[3]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Description:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[1]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Attribute OF Node:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[2]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Required:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[4]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Type:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[5]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Constraints:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[6]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Enumeration:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[7]}
      </span>
    </div>
  </div>
);
const styles = () => ({
  sectionContent: {
    padding: '12px',
    '&:nth-child(even)': {
      backgroundColor: '#EEF6FD',
    },
  },
  attrDesc: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 'normal',
  },
  attributeContent: {
    color: '#2C9FCA',
    fontFamily: 'Lato',
    fontSize: '14px',
    padding: '2px',
    fontWeight: 'bold',
    lineHeight: '1.5em',
  },
  boldAttrDesc: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1.5em',
  },
});

export default withStyles(styles)(AttributeComponent);
