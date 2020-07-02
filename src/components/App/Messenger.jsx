import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Paper, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import Zoom from "react-reveal/Zoom";
import "./messenger.css";

export default function Test() {
  const [dataMessages, setdataMessages] = useState([]);
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const UserId = window.localStorage.getItem("uuid");
      const res = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/messages`
      );
      setdataMessages(res.data);
      const resUsers = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/users/${UserId}`
      );
      setUserData(resUsers.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getMessages();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const fetchData = async (e) => {
    e.preventDefault();
    const UserId = window.localStorage.getItem("uuid");
    await Axios.post("https://mychatappmessenger.herokuapp.com/messages", {
      message,
      UserId,
    });
    await Axios.get(
      `https://mychatappmessenger.herokuapp.com/messages`
    ).then((res) => setdataMessages(res.data));
    setMessage("");
  };

  const UserId = window.localStorage.getItem("uuid");
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <Zoom left>
            <List style={{ width: "500px" }}>
              {dataMessages
                .sort(function (a, b) {
                  return new Date(a.createdAt) - new Date(b.createdAt);
                })
                .slice(Math.max(dataMessages.length - 5, 0))
                .filter((message) => message.userUuid === UserId)
                .map((message) =>
                  dataMessages.indexOf(message) === dataMessages.length - 1 ? (
                    <Zoom left collapse>
                      <Paper
                        elevation={4}
                        style={{ margin: 32, width: "300px" }}
                        className={
                          message.userUuid === UserId ? "paperMe" : "paperOther"
                        }
                      >
                        <ListItem
                          alignItems="flex-start"
                          className={
                            message.userUuid === UserId ? "listMe" : "listOther"
                          }
                        >
                          <ListItemAvatar>
                            <Avatar alt="Temy Sharp" src={userData.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={message.content}
                            secondary={userData.pseudo}
                          />
                          {/* <ThumbUpIcon
                            // onClick={onLike}
                            color="disabled"
                            fontSize="small"
                            style={{ cursor: "pointer" }}
                          /> */}
                        </ListItem>
                      </Paper>
                    </Zoom>
                  ) : (
                    <Paper
                      elevation={4}
                      style={{ margin: 32, width: "300px" }}
                      className={
                        message.userUuid === UserId ? "paperMe" : "paperOther"
                      }
                    >
                      <ListItem
                        alignItems="flex-start"
                        className={
                          message.userUuid === UserId ? "listMe" : "listOther"
                        }
                      >
                        <ListItemAvatar>
                          <Avatar alt="Temy Sharp" src={userData.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={message.content}
                          secondary={
                            <React.Fragment>{userData.pseudo}</React.Fragment>
                          }
                        />
                        {/* <ThumbUpIcon
                          // onClick={onLike}
                          color="disabled"
                          fontSize="small"
                          style={{ cursor: "pointer" }}
                        /> */}
                      </ListItem>
                    </Paper>
                  )
                )}
            </List>
          </Zoom>
          <form autoComplete="off" onSubmit={fetchData}>
            <TextField
              style={{ margin: "20px" }}
              id="message"
              label="message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus="autofocus"
            />
            {message ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "20px" }}
              >
                Send
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "20px" }}
                disabled
              >
                Send
              </Button>
            )}
          </form>
        </>
      )}
    </>
  );
}
