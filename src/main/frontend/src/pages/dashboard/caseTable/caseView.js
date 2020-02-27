import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
  Chip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import CustomFooter from './customFooter';
import { toggleCheckBox } from '../dashboardState';
import { fetchCasesAndFiles } from '../../selectedCases/selectedCasesState';


// const tableStyle = (ratio = 1) => ({
//   width: ((((document.documentElement.clientWidth - 280) * 0.6) / 10) * ratio),
//   overflow: 'hidden',
//   wordBreak: 'break-word',
//   maxWidth: ((((document.documentElement.clientWidth - 280) * 0.6) / 10) * ratio),
//   minWidth: '100px',
// }
// );


const Cases = ({ classes, data }) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }
  const dispatch = useDispatch();
  // data from store
  const chipData = useSelector((state) => (
    state.dashboard.datatable
    && state.dashboard.datatable.filters
      ? state.dashboard.datatable.filters : []));

  // Get the existing caseIds from MyCases cart state
  const caseIds = useSelector((state) => state.cart.cases);

  // The bubble below will shows in the dashboard and work as
  // When user select and filters
  // they will float above the case table on the dashboard .
  // Due to the design issue, disable bubble function for now

  let bubbles = (chipData.map((ckdata) => (
    <Chip
      key={ckdata.datafield + ckdata.name}
      label={ckdata.name}
      onDelete={() => {
        dispatch(toggleCheckBox([{
          groupName: ckdata.groupName,
          name: ckdata.name,
          datafield: ckdata.datafield,
          isChecked: false,
        }]));
      }}
      classes={{
        root: classes.chipRoot,
        deleteIcon: classes.chipDeleteIcon,
      }}
    />
  )));

  bubbles = '';


  const saveButton = useRef(null);


  useEffect(() => {
    saveButton.current.disabled = true;
    saveButton.current.style.color = 'rgb(0, 0, 0,0.26)';
  });

  const columns = [
    {
      name: 'case_id',
      label: 'Case ID',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            <Link to={`/case/${value}`} className={classes.link}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'clinical_trial_code',
      label: 'Trial Code',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div className="mui_td">

            <Link to={`/trial/${tableMeta.rowData[8]}`} className={classes.link}>{value}</Link>

          </div>
        ),
      },
    },
    {
      name: 'arm_id',
      label: 'Arm',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'arm_drug',
      label: 'Arm Treatment',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'disease',
      label: 'Diagnosis',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'race',
      label: 'Race',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'ethnicity',
      label: 'Ethnicity',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'clinical_trial_id',
      label: 'Trial ID',
      options: {
        display: false,
      },
    },
  ];

  let selectedCaseIds = [];

  function exportCases() {
    // Find the newly added cases by comparing
    // existing caseIds and selectedCaseIds
    const uniqueCases = selectedCaseIds.filter((e) => !caseIds.find((a) => e === a.case_id)).length;
    if (uniqueCases > 0) {
      openSnack(uniqueCases);
    }
    dispatch(fetchCasesAndFiles(selectedCaseIds));
    selectedCaseIds = [];
  }

  function onRowsSelect(curr, allRowsSelected) {
    // Change button status based on selection status
    if (allRowsSelected.length === 0) {
      saveButton.current.disabled = true;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';
    } else {
      saveButton.current.disabled = false;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#C53B27';
    }
  }


  const options = () => ({
    selectableRows: true,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    customToolbarSelect: (selectedRows, displayData) => {
      const selectedKeys = Object.keys(selectedRows.data).map((keyVlaue) => (
        selectedRows.data[keyVlaue].index
      ));
      const selectedCaseId = selectedKeys.map((keyVlaue) => (
        displayData[keyVlaue].data[0].props.children[1].props.children
      ));
      selectedCaseIds = selectedCaseId;
      return '';
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="SAVE TO MY CASES"
        onClick={() => exportCases(dispatch)}
        classes={classes}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
        onChangePage={(_, page) => changePage(page)}
      />
    ),

  });

  return (
    <>
      <Snackbar
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={(
          <span>
            {snackbarState.value}
            {' '}
Case(s) successfully added to the My Cases list
          </span>
)}
      />
      <div id="table_cases">
        <div className={classes.chips}>
          {bubbles}
        </div>

        <Grid container>
          <Grid item xs={12} className={classes.caseTitle}>
           Cases
          </Grid>
          <Grid item xs={12}>
            <MUIDataTable
              data={data}
              columns={columns}
              options={options()}
            />
          </Grid>

        </Grid>
        <Grid item xs={12} className={classes.saveButtonDiv}>
          <button
            type="button"
            ref={saveButton}
            onClick={exportCases}
            className={classes.saveButton}
          >
               SAVE TO MY CASES
          </button>
        </Grid>
      </div>
    </>
  );
};

const styles = () => ({
  saveButtonDiv: {
    position: 'absolute',
    margin: '-50px 0 0 0',
    paddingLeft: '25px',
  },
  saveButton: {
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.75',
    fontWeight: '500',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    borderRadius: '35px',
    textTransform: 'uppercase',
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },

  caseTitle: {
    color: '#C32F30',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#C53B27',
  },

});

export default withStyles(styles, { withTheme: true })(Cases);
