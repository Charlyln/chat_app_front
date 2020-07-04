import React from "react";
import { MuiThemeProvider, Grid } from "@material-ui/core";
import Messenger from "./Messenger";
import MyAppBar from "./AppBar/MyAppBar";

function Wall() {
  return (
    <>
      <MyAppBar />
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Messenger />
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
}

export default Wall;
