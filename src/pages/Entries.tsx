import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: "1px",
    fontWeight: "bold",
    paddingBottom:'6px',
    paddingTop:'6px',
    color: 'grey'
  },
  tableCell: {
    color: '#627bc5',
    fontWeight: 600
  }
});

interface Entry {
    client: string;
    project: string;
    projectCode: string;
    hours: string;
    firstName: string;
    lastName: string;
    billable: boolean;
    billableRate: number;
}

interface EntriesData {
  Entries: Entry[];
}

const GET_ENTRIES = gql`
  query GetEntries
  {
    Entries{
      client
      project
      projectCode
      firstName
      lastName
      hours
      billable
      billableRate
    }
  }
`;

export default function BasicTable() {
  const classes = useStyles();
  const { loading, data, error } = useQuery<EntriesData>(
    GET_ENTRIES
  );
  if(loading) return <div>loading</div>
  if(error) return <div>error</div>
    const entries = data && data.Entries ? data.Entries : []
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Name</TableCell>
            <TableCell className={classes.tableHeader}>Clients</TableCell>
            <TableCell className={classes.tableHeader} align='right'>Hours</TableCell>
            <TableCell className={classes.tableHeader} align='right'>Billiable Hours</TableCell>
            <TableCell className={classes.tableHeader} align='right'>Billable Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((row) => (
            <TableRow key={row.project}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                {row.project}
              </TableCell>
              <TableCell className={classes.tableCell}>{row.client}</TableCell>
              <TableCell className={classes.tableCell} align='right'>{row.hours}</TableCell>
              <TableCell align='right'>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                  <div>{row.billable?row.hours:0}</div>
                  <div style={{marginLeft:'4px', color:'grey', minWidth:'46px'}}>{ row.billable?'(100%)':'(0)$'}</div>
                </div>
              </TableCell>
              <TableCell align='right'>{(row.billable && Number(row.hours)>0)?`$${(Number(row.hours)*  row.billableRate).toFixed(2)}`: '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
