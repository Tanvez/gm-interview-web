import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "@apollo/client";
import numeral from "numeral";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { EntriesDataTypes } from "../Types";
import { combineProjects } from "../utils";
import { GET_ENTRIES } from '../api'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: "1px",
    fontWeight: "bold",
    paddingBottom: "6px",
    paddingTop: "6px",
    color: "grey",
  },
  tableCell: {
    color: "#627bc5",
    fontWeight: 600,
  },
  billableHoursLeft: {
    display: "flex",
    justifyContent: "flex-end",
  },
  billableHoursRight: { marginLeft: "4px", color: "grey" },
  billableAmount: { fontWeight: 'bold', color:"#474646" }
});

export default function BasicTable() {
  const classes = useStyles();
  const { loading, data, error } = useQuery<EntriesDataTypes>(GET_ENTRIES);
  //TODO add better loading error screens
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  const entries = data && data.Entries ? data.Entries : [];
  const formattedEntries = combineProjects(entries);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Name</TableCell>
            <TableCell className={classes.tableHeader}>Clients</TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Hours
            </TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Billiable Hours
            </TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Billable Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedEntries.map((row: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell
                className={classes.tableCell}
                component="th"
                scope="row"
              >
                {row.project}
              </TableCell>
              <TableCell className={classes.tableCell}>{row.client}</TableCell>
              <TableCell className={classes.tableCell} align="right">
                {row.hours.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <div className={classes.billableHoursLeft}>
                  <div>{Math.floor(row.billableHours)}</div>
                  <div className={classes.billableHoursRight}>
                    {`(%${Math.floor((row.billableHours / row.hours) * 100)})`}
                  </div>
                </div>
              </TableCell>
              <TableCell align="right" className={classes.billableAmount}>
                {row.billableAmount > 0 ? (
                  <div>
                    {`$${numeral(row.billableAmount.toFixed(2)).format("0,0")}`}
                  </div>
                ) : (
                  <FontAwesomeIcon icon={faMinus} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}