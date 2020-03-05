import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch } from 'react-redux';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Icon-CaseDetail.svg';
import cn from '../../utils/classNameConcat';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../dashboard/dashboardState';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}


const columns = [

  { name: 'file_name', label: 'File Name', sortDirection: 'asc' },
  { name: 'file_type', label: 'File Type' },
  { name: 'parent', label: 'Association' },
  { name: 'file_description', label: 'Description' },
  { name: 'file_format', label: 'Format' },
  {
    name: 'file_size',
    label: 'Size',
    options: {
      customBodyRender: (bytes) => (formatBytes(bytes)),
    },
  },
];


const options = (classes) => ({
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <TableFooter>
      <TableRow>
        <TablePagination
          className={classes.root}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
          // eslint-disable-next-line no-shadow
          onChangePage={(_, page) => changePage(page)}
        />
      </TableRow>
    </TableFooter>
  ),
});


const CaseDetail = ({ classes, data }) => {
  const initDashboardStatus = () => (dispatch) => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const dispatch = useDispatch();
  const redirectTo = (study) => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Study',
        name: study,
        datafield: 'study_code',
        isChecked: true,
      }]));
    });
  };

  const stat = {
    numberOfTrials: 1,
    numberOfCases: 1,
    numberOfFiles: data.filesOfCase.length,
  };
  const caseDetail = data.caseDetailByCaseId[0];

  const notProvided = '';

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: `${caseDetail.case_id} Detail`,
    to: `/study/${caseDetail.case_id}`,
    isALink: true,
  }, {
    name: `${caseDetail.case_id} CASES`,
    to: '/cases',
    onClick: () => redirectTo(caseDetail.case_id),
    isALink: true,
  }, {
    name: caseDetail.case_id,
  }];


  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={icon}
              alt="CTDC case detail header logo"
            />

          </div>

          {(caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null)
             && !(caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null)
            ? (
              <div className={classes.headerTitle}>
                <div className={cn(classes.headerMainTitle, classes.marginTop23)}>
                  <span>
                    <span>
                      {' '}
Case :
                      {' '}
                      {' '}
                      {caseDetail.case_id}
                    </span>
                  </span>
                </div>

                <CustomBreadcrumb data={breadCrumbJson} />
              </div>
            )

            : (
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                  <span>
                    <span>
                      {' '}
Case :
                      {' '}
                      {' '}
                      {caseDetail.case_id}
                    </span>
                  </span>
                </div>
                <CustomBreadcrumb data={breadCrumbJson} />
              </div>
            )}


        </div>


        <div className={classes.detailContainer}>

          <Grid container spacing={4}>

            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.detailContainerLeft}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12} pt={100}>
                  <span className={classes.detailContainerHeader}>DEMOGRAPHICS</span>
                </Grid>

                <Grid container spacing={4} className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>GENDER</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.gender ? caseDetail.gender : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>RACE</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.race ? caseDetail.race : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>Ethnicity</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.ethnicity
                          ? caseDetail.ethnicity : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>


            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.detailContainerRight}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>DIAGNOSIS</span>
                </Grid>
                <Grid container spacing={4} className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Diagnosis</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.disease
                          ? caseDetail.disease : notProvided}
                        {' '}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>


            <Grid item lg={5} md={5} sm={12} xs={12} className={classes.detailContainerRight}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>TRIAL</span>
                </Grid>

                <Grid container spacing={4} className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Assigned to Trial</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.clinical_trial_code
                          ? <Link to={`/trial/${caseDetail.clinical_trial_code}`} className={classes.link}>{caseDetail.clinical_trial_code}</Link>
                          : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  { caseDetail.arms.map((arms) => (
                    <Grid container spacing={4} className={classes.detailContainerItems}>
                      <Grid item xs={12}>
                        <Grid container spacing={4}>
                          <Grid item xs={6}>
                            <span className={classes.title}>Arm</span>
                          </Grid>
                          <Grid item xs={6} className={classes.content}>
                            {arms.arm_id
                              ? arms.arm_id : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={4}>
                          <Grid item xs={6}>
                            <span className={classes.title}>Arm Treatment</span>
                          </Grid>
                          <Grid item xs={6} className={classes.content}>
                            {' '}
                            {arms.arm_drug
                              ? arms.arm_drug : notProvided}
                            {' '}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={4}>
                          <Grid item xs={6}>
                            <span className={classes.title}>Arm Target</span>
                          </Grid>
                          <Grid item xs={6} className={classes.content}>
                            {arms.arm_target
                              ? arms.arm_target : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div id="table_case_detail" className={classes.tableContainer}>

        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>Associated Files</span>
          </div>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MUIDataTable
                  data={data.filesOfCase}
                  columns={columns}
                  options={options(classes)}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>

    </>
  );
};


const styles = (theme) => ({
  paddingLeft8: {
    paddingLeft: '12px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  content: {
    fontSize: '12px',
  },
  marginTop23: {
    marginTop: '24px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },

  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '19px',
    lineHeight: '18px',
    paddingLeft: '5px',
  },
  headerMSubTitle: {
    paddingTop: '8px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '30px',
    overflow: 'hidden',
    paddingLeft: '3px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    paddingLeft: '3px',
  },


  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-14px',
    width: '100px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '12px',
    paddingLeft: '60px',
    paddingRight: '32px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff8a00',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '8px',
    padding: ' 35px 2px 63px 2px !important',
  },
  detailContainerLeft: {
    padding: '35px 0px 0 2px !important',
    minHeight: '290px',
  },
  detailContainerRight: {
    padding: '35px 20px 0px 20px !important',
    minHeight: '290px',
    borderLeft: '#81a6b9 1px solid',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '32px',
    color: '#ff8a00',
  },
  tableDiv: {
    padding: '31px 0px',
    maxWidth: theme.custom.maxContentWidth,
    margin: '10px auto',
  },
  headerButtonLink: {
    textDecoration: 'none',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '5px',
    paddingLeft: '17px',
  },
  title: {
    color: '#9d9d9c',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },
  breadCrumb: {
    paddingTop: '5px',
  },
  paddingTop: {
    paddingTop: '36px',
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
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
