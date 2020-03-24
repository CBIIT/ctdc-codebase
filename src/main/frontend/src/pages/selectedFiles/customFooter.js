import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  noBorderRadius: {
    '& fieldset': {
      borderRadius: 0,
    },
  },
});

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        className={classes.root}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableRow>
    <TableRow>
      <div className={classes.noBorderRadius}>
        <TextField
          id="multiline-user-coments"
          label="User Comments"
          variant="outlined"
          multiline
          rows="6"
          InputProps={{
            classes: {
              focused: classes.focused,
            },
          }}
        />
      </div>
    </TableRow>
    <TableRow />
  </TableFooter>
);

export default withStyles(styles)(CustomFooter);
