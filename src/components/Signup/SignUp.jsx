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
import { Toolbar, AppBar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {
  const [pseudo, setPseudo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const Signup = async (e) => {
    e.preventDefault();
    if (avatar && pseudo) {
      try {
        const res = await axios.post(
          "https://mychatappmessenger.herokuapp.com/users",
          {
            pseudo,
            avatar,
          }
        );
        window.localStorage.setItem("uuid", res.data.uuid);
        setOpen(true);
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else if (pseudo && !avatar) {
      setOpen2(true);
    } else if (!pseudo && avatar) {
      setOpen3(true);
    } else {
      setOpen4(true);
    }
  };

  const getAvatar = () => {
    Axios.get(`https://randomuser.me/api`).then((res) =>
      setAvatar(res.data.results[0].picture.large)
    );
  };

  if (redirect && window.localStorage.getItem("uuid")) {
    return <Redirect to="/wall" />;
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
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
                <Snackbar
                  open={open2}
                  autoHideDuration={2000}
                  onClose={() => setOpen2(false)}
                >
                  <Alert severity="info">
                    Select a picture{" "}
                    <span role="img" aria-label="donut">
                      😀
                    </span>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={open3}
                  autoHideDuration={2000}
                  onClose={() => setOpen3(false)}
                >
                  <Alert severity="info">
                    Put your pseudo{" "}
                    <span role="img" aria-label="donut">
                      😀
                    </span>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={open4}
                  autoHideDuration={2000}
                  onClose={() => setOpen4(false)}
                >
                  <Alert severity="info">
                    Put your pseudo and select a picture{" "}
                    <span role="img" aria-label="donut">
                      😀
                    </span>
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
