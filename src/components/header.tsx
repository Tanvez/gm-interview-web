import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import { getTotalBillableAmountHours } from "../utils";
import numeral from "numeral";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "80px",
      paddingTop: "30px",
    },
    hoursTrackedTitle: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "#474646",
    },
    hoursTracked: {
      fontWeight: "bold",
    },
    billableAmountTitle: {
      fontSize: "15px",
      fontWeight: "bold",
      paddingRight: "75px",
      color: "#474646",
    },
    billableAmount: {
      fontWeight: "bold",
    },
  })
);

interface HeaderProps {
  formattedEntries: any;
}

const Header: React.FC<HeaderProps> = ({ formattedEntries }) => {
  const classes = useStyles();
  const { totalBillableAmount, totalHours } = getTotalBillableAmountHours(
    formattedEntries
  );
  return (
    <Container className={classes.headerContainer} disableGutters>
      <Container>
        <Typography className={classes.hoursTrackedTitle} variant="h4">
          Hours Tracked
        </Typography>
        <Typography variant="h4" className={classes.hoursTracked}>
          {numeral(totalHours).format("0,0.00")}
        </Typography>
      </Container>
      <Container>
        <Typography
          className={classes.billableAmountTitle}
          variant="h4"
          align="right"
        >
          Billable Amount
        </Typography>
        <Typography
          variant="h4"
          align="right"
          className={classes.billableAmount}
        >
          ${numeral(totalBillableAmount).format("0,0.00")}
        </Typography>
      </Container>
    </Container>
  );
};

export default Header;
