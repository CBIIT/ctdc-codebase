import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  withStyles, Divider, Drawer, IconButton, List, Button,
} from '@material-ui/core';
import FacetFilter from './SideBarComponents/FacetFilters';
import funnelIconBlue from '../../assets/icons/Icon-funnel-blue.svg';
import { toggleCheckBox } from '../../pages/dashboard/dashboardState';
import { unselectFilters } from '../../utils/dashboardUtilFunctions';

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  drawerAppBar: {
    height: '39px',
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '200px',
    zIndex: '1201',
    height: 'calc(100% - 200px)',
  },
  anchorLeft: {
    top: '200px',
    width: drawerWidth,
    marginTop: '200px',
    zIndex: '1201',
    height: 'calc(100% - 200px)',
  },
  floatRight: {
    float: 'right',
  },
  floatLeft: {
    float: 'left',
    marginTop: '6px',
    marginLeft: '10px',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '100px',
    borderLeft: '0px',
    minHeight: '20px',
    fontSize: 9,
    textTransform: 'none',
    color: 'black',
    marginLeft: '16px',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
});

const SideBarContent = ({ classes }) => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => (
    state.dashboard.datatable
      && state.dashboard.datatable.filters
      ? state.dashboard.datatable.filters : []));
  return (
    <Drawer
      // variant="persistent"
      anchor="left"
      open={1}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerAppBar}>
        <div className={classes.floatLeft}>
          <Button
            variant="outlined"
            disabled={activeFilters.length === 0}
            onCl
            className={classes.customButton}
            classes={{ root: classes.clearAllButtonRoot }}
            onClick={() => dispatch(toggleCheckBox(unselectFilters(activeFilters)))}
            disableRipple
          >
        Clear All
          </Button>
        </div>
        <div className={classes.floatRight}>
          <IconButton classes={{ root: classes.iconCartButtonRoot }}>
            <img
              className={classes.funnelLogoImg}
              src={funnelIconBlue}
              alt="funnel_image"
            />
          </IconButton>
        </div>
      </div>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <FacetFilter />
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(SideBarContent);
