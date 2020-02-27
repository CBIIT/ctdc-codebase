import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-custom-datatables';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import icon from '../../assets/icons/Icon-MyCases.svg';
import CustomFooter from './customFooter';
import { deleteCasesAction } from './selectedCasesState';

const columns = (classes) => [

  {
    name: 'case_id',
    label: 'Case ID',
    sortDirection: 'asc',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div>
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
      sortDirection: 'asc',
      customBodyRender: (value, tableMeta) => (
        <div>
          {' '}
          <Link to={`/trial/${tableMeta.rowData[8]}`} className={classes.link}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  { name: 'arm_id', label: 'Arm' },
  { name: 'arm_drug', label: 'Arm Treatment' },
  { name: 'disease', label: 'Diagnosis' },
  { name: 'gender', label: 'Gender' },
  { name: 'race', label: 'Race' },
  { name: 'ethnicity', label: 'Ethnicity' },
  {
    name: 'clinical_trial_id',
    label: 'Trial ID',
    options: {
      display: false,
    },
  },
];


const SelectedCasesView = ({ data, classes }) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnackBar(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnackBar() {
    setsnackbarState({ open: false });
  }
  const options = (dispatch, cases) => ({
    selectableRows: true,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    selectedRows: {
      text: 'row(s) selected',
      delete: 'Delete',
      deleteAria: 'Delete Selected Rows',
    },

    onRowsDelete: (rowsDeleted) => {
      // dispatch(rowsDeleted.map(e=>(cases.)))
      if (rowsDeleted.data.length > 0) {
        openSnackBar(rowsDeleted.data.length);
        return dispatch(deleteCasesAction(
          rowsDeleted.data.map((row) => cases[row.dataIndex].case_id),
        ));
      }
      return true;
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="GO TO FILES"
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
      <Grid>
        <Grid item xs={12}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={icon}
                alt="ICDC case detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <span>My Cases: Cases</span>
                </span>
              </div>
            </div>
          </div>
          <div />
        </Grid>
        <Grid item xs={12}>
          <div id="table_selected_cases" className={classes.tableWrapper}>
            <MUIDataTable
              data={data}
              columns={columns(classes)}
              options={options(useDispatch(), data)}
              className={classes.tableStyle}
            />
          </div>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarState.open}
        onClose={closeSnackBar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={(
          <span>
            {snackbarState.value}
            {' '}
Case(s) successfully removed from the My Cases list
          </span>
)}
      />
    </>
  );
};

const styles = (theme) => ({
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '14px',
    width: '100px',
  },
  tableWrapper: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    paddingTop: '30px',
    margin: '30px auto 30px auto',
    maxWidth: '1440px',
    background: '#f3f3f4',
    paddingBottom: '30px',
  },
  tableStyle: {
    maxWidth: '1440px',
    margin: '0 30px',
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '25px',
    lineHeight: '125px',
    paddingLeft: '5px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '100px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
});

export default withStyles(styles, { withTheme: true })(SelectedCasesView);
