import React from "react";
import { Box, Typography } from "@material-ui/core";
import useStyles from "../css/dashboard";

export default function Default() {
const classes = useStyles();
  return (
    <Box className={classes.form}>
      <Typography variant="h4">This page not exist :(</Typography>
    </Box>
  );
}
