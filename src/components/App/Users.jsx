import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import MyAppBar from "./AppBar/MyAppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Paper,
  ListItemAvatar,
  Avatar,
  MuiThemeProvider,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [UserId] = useState(window.localStorage.getItem("uuid"));
  const [usersdata, setusersdata] = useState([]);
  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    getUsers();
    getUser();
  }, []);

  const getUsers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users`);
      setusersdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const id = window.localStorage.getItem("uuid");
    try {
      const res = await Axios.get(`${apiUrl}/users/${id}`);
      setuserdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const postFollow = async (e) => {
    const UserUuid2 = e.target.id;
    const likeObject = userdata.Followers.find((user) => user.UserUuid === UserUuid2);
    
    console.log(UserUuid2);

    console.log(likeObject);

    // try {
    //   const res = await Axios.post(`${apiUrl}/followers`, {
    //     UserUuid,
    //     followerId: UserId,
    //   });
    //   getUsers();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  if (!window.localStorage.getItem("uuid")) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <MyAppBar />
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <List style={{ width: "500px" }}>
                {usersdata.map((user) => (
                  <Paper elevation={4} style={{ margin: 32, width: "300px" }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Temy Sharp" src={user.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={user.pseudo} />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              user.Followers.find(
                                (follower) => follower.followerId === UserId
                              )
                                ? true
                                : false
                            }
                            onChange={postFollow}
                            icon={
                              <Button
                                onClick={postFollow}
                                size="small"
                                variant="contained"
                                color="primary"
                              >
                                Follow
                              </Button>
                            }
                            checkedIcon={
                              <Button
                                onClick={postFollow}
                                size="small"
                                variant="contained"
                                color="secondary"
                              >
                                I Follow
                              </Button>
                            }
                            id={user.uuid}
                          />
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
}
