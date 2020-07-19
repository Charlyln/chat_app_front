import React from "react";
import { MuiThemeProvider, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Crash = () => {
  return (
    <>
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Alert severity="info">
                The website is under maintenance, sorry, please try later{" "}
                <span role="img" aria-label="donut">
                  😀
                </span>
              </Alert>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
};

export default Crash;
