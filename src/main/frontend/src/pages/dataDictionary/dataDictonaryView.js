import React from 'react';
// import { Grid, withStyles, Link } from '@material-ui/core';
import { withStyles, Divider } from '@material-ui/core';

import AboutHeader from '../about/aboutHeaderView';
import Stats from '../../components/Stats/AllStatsController';
import Navbar from './alphabetComponent';
import Section from './attributeComponent';
// import externalIcon from '../../assets/about/About-ExternalLink.svg';
// import submissionGuide from '../../assets/footer/ICDC_DGAB_Guidelines.pdf';

const AboutBody = ({ classes, data }) => (
  <>
    <Stats />
    <AboutHeader title={data.title} />
    <div className={classes.container}>
      <Navbar />
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      <div className={classes.sectionContainer}>
        <div className={classes.sectionTitle}>Introduction</div>
        <div className={classes.introText}>{data.introduction}</div>
      </div>
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      <div className={classes.sectionContainer}>
        <div className={classes.sectionTitle}>CTDC Node Types</div>
        { data.nodeTypes && data.nodeTypes.map((nodeType) => (
          <div className={classes.nodeTypeContainer}>
            <div className={classes.numberCircle}>{nodeType.nodeTypeNUmber}</div>
            <div className={classes.nodeTypeTextContainer}>
              <div className={classes.nodeTypeTitle}>{nodeType.nodeTypeTitle}</div>
              <div className={classes.nodeTypeDesc}>{nodeType.nodeTypeDescription}</div>
              <div className={classes.nodeTypeDesc}>{nodeType.nodeTypeDescriptionParagraphTwo}</div>
              {nodeType.nodeTypeSubList
                && (nodeType.nodeTypeSubList.map((sublist) => (
                  <div className={classes.nodeTypeSubListContainer}>
                    <div className={classes.nodeTypeTitle}>{sublist.nodeTypeSubListTitle}</div>
                    <div className={classes.nodeTypeDesc}>{sublist.nodeTypeSubListDescription}</div>
                  </div>
                ))
                )}
            </div>
          </div>
        ))}

        {data.nodeTypeRelationShipTable && (
        <div className={classes.tableDiv}>
          <table className={classes.table}>
            <thead className={classes.tableHeader}>
              <tr className={classes.tableBodyRow}>
                <th className={classes.headerCell} aria-label="Index" />
                { data.nodeTypeRelationShipTable[0].head.map((rowObj) => (
                  <>
                    <th className={classes.headerCell}>{rowObj}</th>
                  </>
                )) }
              </tr>
            </thead>
            <tbody>
              { data.nodeTypeRelationShipTable[1].body.map((rowObj, index) => (
                <>
                  <tr className={classes.tableBodyRow}>
                    <td className={classes.tableCell}>{index + 1}</td>
                    {/* eslint-disable-next-line max-len */}
                    { rowObj.row.map((rowValue) => <td className={classes.tableCell}>{rowValue}</td>)}
                  </tr>
                </>
              )) }
            </tbody>
          </table>
        </div>
        )}

      </div>
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      <div className={classes.sectionContainer}>
        <div className={classes.sectionTitle}>Document Conventions</div>
        <div className={classes.nodeTypeTitle}>Descriptors for Each Attribute</div>
        <div className={classes.nodeTypeDesc}>An interventional clinical r</div>
      </div>
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      <Navbar />
      <div className={classes.sectionContainer}>
        {data.attribute ? data.attribute.map((row) => (
          <Section
            data={row}
          />
        )) : ''}
      </div>
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
    </div>
  </>
);

const styles = (theme) => ({

  container: {
    margin: 'auto',
    maxWidth: '1440px',
    paddingLeft: '36px',
    paddingRight: '36px',
  },
  sectionContainer: {
    padding: '36px',
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    height: '2px',
  },
  introText: {
    color: '#1C849A',
    fontFamily: 'Raleway',
    fontSize: '1em',
    fontWeight: 500,
    lineHeight: '2em',
  },
  sectionTitle: {
    paddingBottom: '32px',
    color: '#2F2F2F',
    fontFamily: 'Lato',
    fontSize: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  nodeTypeTitle: {
    color: '#358DBA',
    fontFamily: 'Lato',
    fontSize: 21,
    fontWeight: 'bold',
  },
  nodeTypeDesc: {
    color: 'black',
    fontFamily: 'Raleway',
    fontSize: '1em',
    fontWeight: 500,
    lineHeight: '1.5em',
    marginTop: '8px',
  },
  numberCircle: {
    float: 'left',
    borderRadius: '50%',
    width: 36,
    height: 36,
    padding: 8,
    background: '#3FB0D5',
    color: '#fff',
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: 'Lato',
  },
  nodeTypeTextContainer: {
    marginLeft: '50px',
    marginTop: '8px',
  },
  nodeTypeContainer: {
    margin: '8px',
  },
  nodeTypeSubListContainer: {
    marginLeft: '80px',
  },
  tableDiv: {
    marginTop: '45px',
  },
  table: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
    lineHeight: '30px',
    textAlign: 'left',
    width: '100%',
  },
  tableHeader: {
    fontFamily: theme.custom.fontFamily,
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    color: '#3E7AAA',
  },
  tableCell: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '14px',
    padding: '8px 15px 8px 0px',
    borderBottom: '0.66px solid #087CA5',
  },
  headerCell: {
    borderBottom: '4px solid #087CA5',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontWeight: 'bolder',
  },
});

AboutBody.defaultProps = {
  classes: {},
  data: {
    content: [],
  },
};

export default withStyles(styles)(AboutBody);
