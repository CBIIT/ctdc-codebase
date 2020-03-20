import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  buttonRoot: {
    background: '#DE5227',
    '&:hover': {
      background: '#DE5227',
    },
    borderRadius: '35px',
    fontSize: '15px',
    padding: '10px 40px 10px 40px',
    maxHeight: '42px',
    color: '#FFFF',
  },
});

const linkStyle = {
  textDecoration: 'none',
  cursor: 'auto',
};

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  text,
}) => (
  <TableFooter>
    <TableRow>
      <TableCell>
        <Link to={count > 0 && 'mycasesfiles'} style={linkStyle}>
          <Button disabled={count < 1} variant="contained" color="primary" classes={{ root: classes.buttonRoot }}>
            {text}
          </Button>
        </Link>
      </TableCell>
      <TablePagination
        className={classes.root}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableRow>
  </TableFooter>
);

export default withStyles(styles)(CustomFooter);
