import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
  Divider,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { toggleCheckBox } from '../../../pages/dashboard/dashboardState';


const FacetPanel = ({ classes }) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboard
    && state.dashboard.checkbox
      ? state.dashboard.checkbox : {
        data: [],
        defaultPanel: false,
      }));

  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!expanded || !(expanded === `${sideBarContent.defaultPanel}false` || expanded !== false)) {
      setExpanded(sideBarContent.defaultPanel);
    }
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : `${panel}false`);

    // set height of filters.
  };

  const handleToggle = (value) => () => {
    const valueList = value.split('$$');
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      name: valueList[0],
      datafield: valueList[2],
      isChecked: !(valueList[3] === 'true'),
    }]));
  };

  return (
    <>
      {sideBarContent.data.map((sideBarItem) => {
        if (sideBarItem.show) {
          return (
            <>
              <ExpansionPanel
                expanded={expanded === sideBarItem.groupName}
                onChange={handleChange(sideBarItem.groupName)}
                className={classes.expansion}
                classes={{ root: classes.expansion }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ArrowDropDownIcon style={{ fill: '#3695A9' }} />}
                  aria-controls={sideBarItem.groupName}
                  id={sideBarItem.groupName}
                  classes={{ root: classes.expnd }}
                >
                  {/* <ListItemText primary={sideBarItem.groupName} /> */}
                  <div className={classes.panelSummaryText}>{sideBarItem.groupName}</div>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <List component="div" disablePadding dense>
                    {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.cases === 0 && !checkboxItem.isChecked) {
                return '';
              }
              return (
                <ListItem
                  button
                  onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}`)}
                  className={classes.nested}
                  classes={{ gutters: classes.listItemGutters }}
                >
                  <Checkbox
                    id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
                    icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                    checked={checkboxItem.isChecked}
                    tabIndex={-1}
                    disableRipple
                    color="secondary"
                    classes={{ root: classes.checkboxRoot }}
                  />
                  <div className={classes.panelDetailText}>{`${checkboxItem.name}  (${checkboxItem.cases})`}</div>
                </ListItem>
              );
            })
          }
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
            </>
          );
        }
        return '';
      })}
    </>
  );
};


const styles = () => ({
  expansion: {
    boxShadow: 'none',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  expnd: {
    '&$expanded': {
      margin: 'auto',
    },
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    marginLeft: '35px',
    height: '2px',
  },
  panelSummaryText: {
    marginLeft: '24px',
    color: '#194563',
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: 600,
  },
  panelDetailText: {
    color: '#004C73',
    fontFamily: 'Open Sans',
    fontSize: 12,
  },
  checkboxRoot: {
    color: '#5E8CA5',
    height: 12,
  },
  listItemGutters: {
    padding: '8px 0px 8px 30px',
  },
});

export default withStyles(styles)(FacetPanel);
