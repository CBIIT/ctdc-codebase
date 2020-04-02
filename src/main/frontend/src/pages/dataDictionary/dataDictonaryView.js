/* eslint-disable */

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
        <div className={classes.nodeTypeTitle}>clinical_trial</div>
        <div className={classes.nodeTypeDesc}>An interventional clinical research study that is represented within the CTDC, in terms of its design, data and key results. </div>
        <div className={classes.nodeTypeTitle}>arm</div>
        <div className={classes.nodeTypeDesc}> A treatment arm tests a single therapeutic agent against a set of genomic aberrations. Each arm may accrue at most 35 patients; for arms studying more common genomic aberrations up to 70 patients may be enrolled. Each treatment arm has a set of inclusion and exclusion criteria.</div>
      </div>
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
      <div className={classes.sectionContainer}>
        <div className={classes.sectionTitle}>Document Conventions</div>
        <div className={classes.nodeTypeTitle}>Descriptors for Each Attribute</div>
        <div className={classes.nodeTypeDesc}>An interventional clinical research study that is represented within the CTDC, in terms of its design, data and key results. </div>
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

const styles = () => ({

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
    fontFamily: 'Lato',
    fontSize: 21,
  },

});

AboutBody.defaultProps = {
  classes: {},
  data: {
    content: [],
  },
};

export default withStyles(styles)(AboutBody);
