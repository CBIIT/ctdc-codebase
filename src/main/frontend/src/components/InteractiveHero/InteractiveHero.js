import React from 'react';
import { withStyles } from '@material-ui/core';
import HorseShoe from './HorseShoe';
import ActiveCases from '../../assets/landing/animation/Query-Active.png';
import InActiveCases from '../../assets/landing/animation/Query-InActive.png';
import WhispInActive from '../../assets/landing/animation/Whisp-All_Active.png';
// import ActiveFiles from '../../assets/landing/animation/activeFiles.svg';
// import InActiveFiles from '../../assets/landing/animation/InActiveFiles.svg';
// import ActiveTrials from '../../assets/landing/animation/activeTrials.svg';
// import InActiveTrials from '../../assets/landing/animation/InActiveTrials.svg';
import CircularIcon from './CircularIcon';
import FacingDown from '../../assets/landing/animation/Dial_facing_down.svg';
import FacingUp from '../../assets/landing/animation/Dial_facing_up.svg';
import FacingRight from '../../assets/landing/animation/Dial_facing_right.svg';

const CasesInActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteText}>
      {heroData ? heroData.numberOfCases : 'NA'}
      {' '}
CASES
    </div>
    <div className={classes.blueText}>
  from 1 TRIAL
    </div>
    <div className={classes.blueText}>
  from 2 ARMS
    </div>
  </div>
);

const CasesActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteText}>
      {heroData ? heroData.numberOfCases : 'NA'}
      {' '}
ACTIVE
    </div>
    <div className={classes.blueText}>
  from 1 TRIAL
    </div>
    <div className={classes.blueText}>
  from 2 ARMS
    </div>
  </div>
);

const TrialsInActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.blueText}>
      {heroData ? heroData.numberOfFiles : 'NA'}
      {' '}
DIFFERENT FILE TYPES
    </div>
    <div className={classes.whiteText}>
  from 1000 FILES
    </div>
  </div>
);

const TrialsActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.blueText}>
      {heroData ? heroData.numberOfFiles : 'NA'}
      {' '}
ACTIVE FILE TYPES
    </div>
    <div className={classes.whiteText}>
  from 1000 FILES
    </div>
  </div>
);


const FilesInActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteText}>
      {heroData ? heroData.numberOfFiles : 'NA'}
      QUERYING
    </div>
    <div className={classes.blueText}>
    multiple Web and
    </div>
    <div className={classes.blueText}>
    API-based filtering
    </div>
  </div>
);

const FilesActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteText}>
      {heroData ? heroData.numberOfFiles : 'NA'}
      ACTIVE QUERYING
    </div>
    <div className={classes.blueText}>
    multiple Web and
    </div>
    <div className={classes.blueText}>
    API-based filtering
    </div>
  </div>
);

const InteractiveHero = ({ classes, heroData }) => {
  const [activeState, setActiveState] = React.useState({
    isActive: 'cases',
    transformedHorseShoe: FacingUp,
  });
  return (
    <div className={classes.animationWrapper}>
      <div className={classes.casesIcon} onMouseEnter={() => { setActiveState({ isActive: 'cases', transformedHorseShoe: FacingUp }); }}>
        <CircularIcon isActive={activeState.isActive === 'cases'} InactiveImage={InActiveCases} activeImage={ActiveCases} />
      </div>
      <div className={classes.casesText}>
        {activeState.isActive === 'cases' ? <CasesActiveText heroData={heroData} classes={classes} /> : <CasesInActiveText heroData={heroData} classes={classes} />}
      </div>
      <HorseShoe transformedHorseShoe={activeState.transformedHorseShoe} />

      <div className={classes.trialsIcon} onMouseEnter={() => { setActiveState({ isActive: 'trials', transformedHorseShoe: FacingRight }); }}>
        <CircularIcon isActive={activeState.isActive === 'trials'} InactiveImage={InActiveCases} activeImage={ActiveCases} />
      </div>
      <div className={classes.trialsText}>
        {activeState.isActive === 'trials' ? <TrialsActiveText heroData={heroData} classes={classes} /> : <TrialsInActiveText heroData={heroData} classes={classes} />}
      </div>
      <div className={classes.filesIcon} onMouseEnter={() => { setActiveState({ isActive: 'files', transformedHorseShoe: FacingDown }); }}>
        <CircularIcon isActive={activeState.isActive === 'files'} InactiveImage={InActiveCases} activeImage={ActiveCases} />
      </div>
      <div className={classes.filesText}>
        {activeState.isActive === 'files' ? <FilesActiveText heroData={heroData} classes={classes} /> : <FilesInActiveText heroData={heroData} classes={classes} />}
      </div>
    </div>
  );
};

const styles = () => ({
  animationWrapper: {
    left: '0px',
    position: 'absolute',
    '@media (min-width: 800px)': {
      left: 'calc(50%)',
    },
    '@media (min-width: 1200px)': {
      left: 'calc(60%)',
    },
    '@media (min-width: 1600px)': {
      left: 'calc(70%)',
    },
  },
  casesIcon: {
    position: 'absolute',
    float: 'left',
    marginTop: '35px',
    width: '100px',
    left: '60px',
  },
  casesSVG: {
    position: 'absolute',
    float: 'left',
    marginTop: '15px',
    // width: '100px',
    left: '180px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  casesText: {
    position: 'absolute',
    float: 'left',
    marginTop: '55px',
    width: '180px',
    left: '150px',
    // color: '#FFFFFF',
    // fontFamily: 'Oswald',
    // fontSize: 16,
    // fontWeight: 500,
    color: '#FEFFFF',
    fontFamily: 'Oswald',
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'center',
    // background: `url(${background})`,
  },
  trialsIcon: {
    left: '300px',
    position: 'absolute',
    float: 'left',
    marginTop: '235px',
  },
  trialsSVG: {
    position: 'absolute',
    float: 'left',
    marginTop: '364px',
    // width: '100px',
    left: '370px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  trialsText: {
    position: 'absolute',
    float: 'left',
    marginTop: '370px',
    left: '300px',
    width: '150px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  filesIcon: {
    marginTop: '450px',
    position: 'absolute',
    float: 'left',
    left: '60px',
  },
  filesSVG: {
    position: 'absolute',
    float: 'left',
    marginTop: '430px',
    // width: '100px',
    left: '180px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  filesText: {
    position: 'absolute',
    float: 'left',
    marginTop: '470px',
    left: '180px',
    width: '150px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  hide: {
    display: 'none',
  },
  // topGradiaent: {
  //   height: '18px',
  //   background: `url(${WhispTop})`,
  //   margin: '0 auto',
  // },
  // bottomGradiaent: {
  //   height: '18px',
  //   background: `url(${WhispTop})`,
  //   margin: '0 auto',
  // },
  whiteText: {
    color: '#FEFFFF',
    fontFamily: 'Oswald',
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'center',
  },
  blueText: {
    color: '#A8DAF1',
    fontFamily: 'Oswald',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'center',
  },
  inActiveTextBG: {
    background: `url(${WhispInActive})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
});


export default withStyles(styles)(InteractiveHero);
