import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import icon from '../../assets/icons/Icon-MyCases.svg';
import wizardIcon from '../../assets/icons/MyCases-Wizard-Step3.svg';
import CustomFooter from './customFooter';

class selectedFilesView extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data,
    };

    // React refs, return DOM node, we can change DOM node's properties.
    // Pure HTML works well with  React refs, if refers to a react component
    // you will get read-only issue.
    this.downloadButton = React.createRef();
  }

  componentDidMount() {
    // Init download button status and style
    // It may a problem that the code below always
    // set downloadButton as grey out .
    this.downloadButton.current.disabled = true;
    this.downloadButton.current.style.color = 'rgb(0, 0, 0,0.26)';
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      data: nextProps.data,
    };
  }


  onRowsSelect(curr, allRowsSelected) {
    // Change button status based on selection status
    if (allRowsSelected.length === 0) {
      this.downloadButton.current.disabled = true;
      this.downloadButton.current.style.color = '#FFFFFF';
      this.downloadButton.current.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';
    } else {
      this.downloadButton.current.disabled = false;
      this.downloadButton.current.style.color = '#FFFFFF';
      this.downloadButton.current.style.backgroundColor = '#DE5227';
      this.downloadButton.current.style.cursor = 'pointer';
    }
  }


  render() {
    let globalData = [];
    const { classes } = this.props;
    const state = { ...this.state };
    function fileName() {
      const date = new Date();
      const yyyy = date.getFullYear();
      let dd = date.getDate();
      let mm = (date.getMonth() + 1);

      if (dd < 10) { dd = `0${dd}`; }

      if (mm < 10) { mm = `0${mm}`; }

      const todaysDate = `${yyyy}-${mm}-${dd}`;

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      if (hours < 10) { hours = `0${hours}`; }

      if (minutes < 10) { minutes = `0${minutes}`; }

      if (seconds < 10) { seconds = `0${seconds}`; }

      return `${'CTDC File Manifest'} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
    }


    function convertToCSV(jsonse) {
      const objArray = jsonse;
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      array.map((entry, index) => {
        let line = '';
        Object.keys(entry).map((keyName) => {
          if (line !== '') line += ',';
          line += entry[keyName];
          return line;
        });

        if (index === 0) {
          str = ['Case ID', 'File Name', 'File ID', 'Md5sum', 'User Comments'].join(',');
          str += `\r\n${line},${document.getElementById('multiline-user-coments').value}\r\n`;
        } else {
          str += `${line}\r\n`;
        }
        return str;
      });

      return str;
    }

    function downloadJson() {
      const jsonse = JSON.stringify(globalData);
      const csv = convertToCSV(jsonse);
      const data = new Blob([csv], { type: 'text/csv' });
      const JsonURL = window.URL.createObjectURL(data);
      let tempLink = '';
      tempLink = document.createElement('a');
      tempLink.setAttribute('href', JsonURL);
      tempLink.setAttribute('download', fileName());
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }

    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(1024));

      return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
    }


    const columns = [

      {
        name: 'case_id',
        label: 'Case ID',
        sortDirection: 'asc',
        options: {
          customBodyRender: (value) => (
            <div className={classes.tableCell1}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_name',
        label: 'File Name',
        sortDirection: 'asc',
        options: {
          customBodyRender: (value) => (
            <div className={classes.tableCell2}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_type',
        label: 'File Type',
        options: {
          customBodyRender: (value) => (
            <div className={classes.tableCell3}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'parent',
        label: 'Association',
        options: {
          customBodyRender: (value) => (
            <div className={classes.tableCell4}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_description',
        label: 'Description',
        options: {
          customBodyRender: (value) => (
            <div className={classes.tableCell5}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_format',
        label: 'Format',
        options: {
          customBodyRender: (value) => (
            <div className={classes.tableCell6}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_size',
        label: 'Size',
        options: {
          customBodyRender(bytes) {
            return (
              <div className={classes.tableCell7}>
                {' '}
                {formatBytes(bytes)}
                {' '}
              </div>
            );
          },
        },
      },
      {
        name: 'uuid',
        label: 'UUID',
        options: {
          display: false,

        },
      },
      {
        name: 'md5sum',
        label: 'Md5Sum',
        options: {
          display: false,
        },
      },
    ];


    const options = () => ({
      selectableRows: 'multiple',
      responsive: 'stacked',
      search: false,
      filter: false,
      searchable: false,
      print: false,
      download: false,
      viewColumns: false,
      pagination: true,
      onRowsSelect: (curr, allRowsSelected) => this.onRowsSelect(curr, allRowsSelected),
      customToolbarSelect: (selectedRows, displayData) => {
        const dataIndex = Object.keys(selectedRows.data).map((keyVlaue) => (
          selectedRows.data[keyVlaue].index
        ));

        const keysToInclude = [0, 1, 7, 8];

        const selectedFiles = dataIndex.map((keyVlaue) => (
          keysToInclude.map((value) => (displayData[keyVlaue].data[value]))
        ));

        globalData = selectedFiles.map((obj) => ({
          caseId: obj[0].props.children[1],
          fileName: obj[1].props.children[1],
          uuid: obj[2],
          md5Sum: obj[3],
        }));

        return '';
      },
      customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
        <CustomFooter
          className={classes.customFooterStyle}
          text="DOWNLOAD MANIFEST"
          label="User Comments"
          onClick={downloadJson}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
          onChangePage={(_, page) => changePage(page)}
        />
      ),
    });
    const btnStyle = {
      color: 'rgba(0, 0, 0,0.26)',
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      padding: '6px 16px',
      fontSize: '0.875rem',
      minWidth: '64px',
      boxSizing: 'border-box',
      transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      lineHeight: '1.75',
      fontWeight: '500',
      fontFamily: '"Lato Regular","Roboto", "Helvetica", "Arial", sans-serif',
      borderRadius: '35px',
      textTransform: 'uppercase',
      marginLeft: '-28px',
    };

    const divStyle = {
      position: 'absolute',
      marginTop: '-47px',
      marginLeft: '30px',
    };
    return (
      <Grid>
        <div className={classes.myFilesWrapper}>
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
                    <span>My Cases: Files</span>
                  </span>
                </div>
              </div>
              <div className={classes.tableTitleWizard}>
                <img
                  src={wizardIcon}
                  alt="CTDC MyCases Wizard"
                />
              </div>
            </div>

            <div id="table_selected_files" className={classes.tableWrapper}>
              <MUIDataTable
                data={state.data}
                columns={columns}
                options={options()}
                className={classes.tableStyle}
              />
              <div style={divStyle}>
                <button
                  type="button"
                  style={btnStyle}
                  ref={this.downloadButton}
                  onClick={downloadJson}
                >
                  download manifest
                </button>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    );
  }
}

const styles = (theme) => ({
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-8.9px',
    width: '82px',
    filter: 'drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2))',
  },
  tableWrapper: {
    margin: 'auto 3% auto 3%',
    maxWidth: '100%',
  },
  tableStyle: {
    maxWidth: '100%',
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#DE5227',
    fontSize: '20pt',
    lineHeight: '75px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '85px',
    paddingLeft: '3px',
    marginBottom: '-30px',
    position: 'absolute',
  },
  tableTitleWizard: {
    width: '400px',
    float: 'right',
    paddingTop: '8px',
  },
  header: {
    borderBottom: '#4B619A 10px solid',
    height: '77px',
    maxWidth: '100%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  myFilesWrapper: {
    border: '#DE5227 4px solid',
    borderRadius: '35px',
    margin: '80px',
    marginLeft: '3%',
    marginRight: '3%',
    paddingBottom: '20px',
    background: 'white',
  },
  tableCell1: {
    width: '130px',
  },
  tableCell2: {
    width: '300px',
  },
  tableCell3: {
    width: '190px',
  },
  tableCell4: {
    width: '170px',
  },
  tableCell5: {
    width: '120px',
  },
  tableCell6: {
    width: '80px',
  },
  tableCell7: {
    width: '80px',
  },
});
export default withStyles(styles, { withTheme: true })(selectedFilesView);
