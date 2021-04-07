import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-ui/core";

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
    fontWeight: "bold",
  },
  billableHoursRight: { marginLeft: "4px", color: "grey", fontWeight: "bold" },
  billableAmount: { fontWeight: "bolder", color: "#474646" },
});
interface BasicTableProps {
  formattedEntries: any
}

const BasicTable: React.FC<BasicTableProps> = ({ formattedEntries }) => {
  const classes = useStyles();

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
                <Typography className={classes.billableHoursLeft}>
                  <Typography>{Math.floor(row.billableHours)}</Typography>
                  <Typography className={classes.billableHoursRight}>
                    {`(%${Math.floor((row.billableHours / row.hours) * 100)})`}
                  </Typography>
                </Typography>
              </TableCell>
              <TableCell align="right">
                {row.billableAmount > 0 ? (
                  <Typography className={classes.billableAmount}>
                    {`$${numeral(row.billableAmount.toFixed(2)).format("0,0.00")}`}
                  </Typography>
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

export default BasicTable