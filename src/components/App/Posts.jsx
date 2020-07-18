import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Paper,
  TextField,
  Button,
  ListItemAvatar,
  Avatar,
  Grid,
  Snackbar,
  Icon,
  FormControlLabel,
  Checkbox,
  MuiThemeProvider,
} from "@material-ui/core";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import "./messenger.css";
import { Redirect } from "react-router-dom";
import Slide from "react-reveal";
import Alert from "@material-ui/lab/Alert";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { apiUrl } from "../../apiUrl";
import MyAppBar from "./AppBar/MyAppBar";

export default function Posts() {
  const [dataMessages, setdataMessages] = useState([]);
  // const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [UserId] = useState(window.localStorage.getItem("uuid"));
  const [userdata, setuserdata] = useState([]);
  const [open, setOpen] = useState(false);
  const array = [1, 2, 3, 4, 5];
  const emojis = [
    {
      logo: "😀",
    },
    {
      logo: "😍",
    },
    {
      logo: "🤣",
    },
    {
      logo: "🤘",
    },
  ];

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    getMessages();
    getUser();
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const getMessages = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/messages`);
      setdataMessages(res.data);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.log(err);
    }
  };

  const putLike = async (e) => {
    const id = e.target.id;
    const likeObject = userdata.Likes.find((like) => like.MessageUuid === id);
    if (likeObject) {
      const likeId = likeObject.id;
      console.log(likeObject);

      await Axios.delete(`${apiUrl}/likes/${likeId}`);
    } else {
      await Axios.post(`${apiUrl}/likes`, {
        MessageUuid: id,
        UserUuid: UserId,
      });
    }

    getMessages();
    getUser();
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

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const postMessage = async (e) => {
    e.preventDefault();
    try {
      const UserId = window.localStorage.getItem("uuid");
      await Axios.post(`${apiUrl}/messages`, {
        content: message,
        UserUuid: UserId,
      });
      const res = await Axios.get(`${apiUrl}/messages`);
      setdataMessages(res.data);
      setMessage("");
      // setFirstMessage(true)
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
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              {isLoading ? (
                <>
                  <List style={{ width: "500px" }}>
                    <Slide top cascade>
                      {array.map((el) => (
                        <ListItem alignItems="flex-start">
                          <Skeleton
                            variant="rect"
                            width={300}
                            height={72}
                            className="paperOther"
                            style={{ margin: "8px 16px" }}
                          ></Skeleton>
                        </ListItem>
                      ))}
                    </Slide>
                  </List>
                </>
              ) : (
                <>
                  <List style={{ width: "500px" }}>
                    {dataMessages
                      .filter((message) =>
                        message.User.Followers.find(
                          (element) => element.followerId === UserId
                        )
                      )
                      .sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      .slice(Math.max(dataMessages.length - 5, 0))
                      .map((message) => (
                        <Paper
                          elevation={4}
                          style={{ margin: 32, width: "300px" }}
                          className={
                            message.UserUuid === UserId
                              ? "paperMe"
                              : "paperOther"
                          }
                        >
                          <ListItem
                            alignItems="flex-start"
                            className={
                              message.UserUuid === UserId
                                ? "listMe"
                                : "listOther"
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Temy Sharp"
                                src={message.User.avatar}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={message.content || "message"}
                              secondary={message.User.pseudo}
                            />

                            <FormControlLabel
                              control={
                                <Checkbox
                                  icon={<FavoriteBorder fontSize="small" />}
                                  checkedIcon={<Favorite fontSize="small" />}
                                  id={message.uuid}
                                  name={message.likes}
                                  onChange={putLike}
                                  checked={
                                    message.Likes.find(
                                      (like) => like.UserUuid === UserId
                                    )
                                      ? true
                                      : false
                                  }
                                />
                              }
                              label={
                                message.Likes.length > 0
                                  ? message.Likes.length
                                  : ""
                              }
                            />
                          </ListItem>
                        </Paper>
                      ))}
                  </List>
                </>
              )}
              <form autoComplete="off" onSubmit={postMessage}>
                <TextField
                  style={{ margin: "20px" }}
                  id="message"
                  label="message"
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus="autofocus"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!message}
                  style={{ margin: "27px 0px" }}
                  endIcon={<Icon>send</Icon>}
                >
                  Send
                </Button>

                <Grid container alignItems="center" justify="center">
                  {emojis.map((emoji) => (
                    <Button
                      type="button"
                      onClick={() => setMessage(message + emoji.logo)}
                    >
                      <span role="img" aria-label="donut">
                        {emoji.logo}
                      </span>
                    </Button>
                  ))}
                  {isLoading ? (
                    ""
                  ) : (
                    <Snackbar
                      open={open}
                      autoHideDuration={5000}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      onClose={handleClose}
                    >
                      {/* <Alert
                  onClose={handleClose}
                  severity="info"
                  style={{ width: "330px" }}
                >
                  Happy to see you again <strong>{userdata.pseudo}</strong> !{" "}
                  <span role="img" aria-label="donut">
                    😀
                  </span>
                </Alert> */}

                      <Alert
                        onClose={handleClose}
                        severity="info"
                        style={{ width: "330px" }}
                      >
                        Welcome to the chat app{" "}
                        <strong>{userdata.pseudo}</strong> ! You can send
                        messages and receive messages from your friends. Enjoy{" "}
                        <span role="img" aria-label="donut">
                          😀
                        </span>
                      </Alert>
                    </Snackbar>
                  )}{" "}
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
}
