import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  Paper,
  Avatar,
  MuiThemeProvider,
  Grid,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {
  const [pseudo, setPseudo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleClose = () => {
    setOpen(false);
    setRedirect(true);
  };

  const Signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/users", {
        pseudo,
        avatar,
      });
      window.localStorage.setItem("uuid", res.data.id);
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getAvatar = () => {
    Axios.get(`https://randomuser.me/api`).then((res) =>
    setAvatar(res.data.results[0].picture.large)
    );
  };

  if (redirect) {
    return <Redirect to="/wall" />;
  }

  return (
    <>
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Button
                type="submit"
                color="primary"
                style={{ margin: "20px" }}
                variant="outlined"
                onClick={getAvatar}
              >
                Next
              </Button>
              <Avatar
                alt="Temy Sharp"
                src={avatar}
                style={{ width: "70px", height: "70px" }}
              />
              <Paper elevation={4} style={{ margin: 32 }}>
                <form autoComplete="off" onSubmit={Signup}>
                  <TextField
                    style={{ margin: "20px" }}
                    id="standard-basic"
                    label="Pseudo"
                    onChange={(e) => setPseudo(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ margin: "20px" }}
                  >
                    Join
                  </Button>
                </form>

                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Welcome {pseudo}
                  </Alert>
                </Snackbar>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
};

export default SignUp;
