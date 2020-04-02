import React from 'react';
// import { Grid, withStyles, Link } from '@material-ui/core';
import { withStyles, Divider } from '@material-ui/core';

import AboutHeader from '../about/aboutHeaderView';
import Stats from '../../components/Stats/AllStatsController';
import Navbar from './alphabet';
import Section from './section';
// import externalIcon from '../../assets/about/About-ExternalLink.svg';
// import submissionGuide from '../../assets/footer/ICDC_DGAB_Guidelines.pdf';

const AboutBody = ({ classes, data }) => (
  <>
    <Stats />
    <AboutHeader title={data.title} />
    <div className={classes.container}>
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      <div className={classes.sectionContainer}>
        <div className={classes.sectionTitle}>Introduction</div>
        <div className={classes.introText}>{data.introduction}</div>
        <Navbar />
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

  },
  sectionTitle: {

  },
  text: {
    // height: '476px',
    // width: '675px',
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    fontSize: '15px',
    lineHeight: '22px',
  },
  title: {
    color: '#0B3556',
    fontWeight: 'bold',
  },
  rightSection: {
    padding: '8px 25px !important',
    float: 'left',
  },
  leftSection: {
    float: 'left',
  },
  aboutSection: {
    margin: '60px auto 60px auto',
  },
  img: {
    width: '100%',
  },
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  link: {
    color: '#0296C9',
    '&:hover': {
      color: '#0296C9',
    },
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
