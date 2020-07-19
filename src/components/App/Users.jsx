import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import MyAppBar from "./AppBar/MyAppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HelpIcon from "@material-ui/icons/Help";

import {
  Paper,
  ListItemAvatar,
  Avatar,
  Grid,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { Slide } from "react-reveal";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@material-ui/lab/Alert";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [UserId] = useState(window.localStorage.getItem("uuid"));
  const [usersdata, setusersdata] = useState([]);
  const [follow, setFollow] = useState("");
  const [followId, setFollowId] = useState("");
  const [open, setOpen] = useState(false);

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users`);
      setusersdata(res.data);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.log(err);
    }
  };

  const openInfos = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const postFollow = async (e) => {
    e.preventDefault();
    console.log(follow);

    try {
      await Axios.post(`${apiUrl}/followers`, {
        UserUuid: follow,
        followerId: UserId,
      });
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFollow = async (e) => {
    e.preventDefault();
    const followerId = followId.id;

    try {
      await Axios.delete(`${apiUrl}/followers/${followerId}`);
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  if (!window.localStorage.getItem("uuid")) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <MyAppBar />

      <Grid container alignItems="center" style={{ marginTop: "70px" }}>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: "end" }}>
            <IconButton>
              <HelpIcon onClick={openInfos} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              {isLoading ? (
                <>
                  <List style={{ width: "500px", marginTop: "17px" }}>
                    <Slide top cascade>
                      {array.map((el) => (
                        <ListItem alignItems="flex-start">
                          <Skeleton
                            variant="rect"
                            width={300}
                            height={72}
                            className="usersCards"
                            style={{ margin: "8px 16px" }}
                          ></Skeleton>
                        </ListItem>
                      ))}
                    </Slide>
                  </List>
                </>
              ) : (
                <List style={{ width: "500px" }}>
                  {usersdata
                    .filter((user) => user.uuid !== UserId)
                    .sort(function (a, b) {
                      return new Date(a.createdAt) - new Date(b.createdAt);
                    })
                    .map((user) => (
                      <Paper
                        elevation={4}
                        style={{ margin: 32, width: "300px" }}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Temy Sharp" src={user.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.pseudo}
                            secondary={`${user.Followers.length} ${
                              user.Followers.length < 2
                                ? "follower"
                                : "followers"
                            }`}
                          />

                          {user.Followers.find(
                            (follower) => follower.followerId === UserId
                          ) ? (
                            <form onSubmit={deleteFollow}>
                              <Button
                                onClick={() =>
                                  setFollowId(
                                    user.Followers.find(
                                      (follow) => follow.followerId === UserId
                                    )
                                  )
                                }
                                size="small"
                                variant="contained"
                                color="secondary"
                                type="submit"
                              >
                                I Follow
                              </Button>
                            </form>
                          ) : (
                            <form onSubmit={postFollow}>
                              <Button
                                onClick={() => setFollow(user.uuid)}
                                size="small"
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Follow
                              </Button>
                            </form>
                          )}
                        </ListItem>
                      </Paper>
                    ))}
                </List>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" style={{ width: "330px" }}>
          Here you can follow people you want and see their posts on the wall !
          I suggest you <strong>Dark Vador</strong> and{" "}
          <strong>Homer Simpson</strong>, funny guys{" "}
          <span role="img" aria-label="donut">
            😀
          </span>
        </Alert>
      </Snackbar>
    </>
  );
}
