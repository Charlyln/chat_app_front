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
} from "@material-ui/core";
import Axios from "axios";
import "./messenger.css";
import { Redirect } from "react-router-dom";
import Slide from "react-reveal";
import Alert from "@material-ui/lab/Alert";

export default function Test() {
  const [dataMessages, setdataMessages] = useState([]);
  // const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [UserId] = useState(window.localStorage.getItem("uuid"));
  const [userdata, setuserdata] = useState("");
  const [open, setOpen] = useState(true);

  // const [firstMessage, setFirstMessage] = useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    getMessages();
    getUser();
  }, []);

  const getMessages = async () => {
    try {
      const res = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/messages`
      );
      setdataMessages(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const id = window.localStorage.getItem("uuid");
    try {
      const res = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/users/${id}`
      );
      setuserdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     Axios.post("https://mychatappmessenger.herokuapp.com/messages", {
  //       content:
  //         "Hello, I am the chat bot, welcome to the chat app ! You can send messages and receive messages from your friends. Enjoy 😀 ",
  //       userUuid: "a24aae34-9156-45e9-bca5-8584749a473b",
  //     });
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

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
      await Axios.post("https://mychatappmessenger.herokuapp.com/messages", {
        content: message,
        userUuid: UserId,
      });
      const res = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/messages`
      );
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
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <List style={{ width: "500px" }}>
            <Slide top cascade>
              <div>
                {dataMessages
                  .sort(function (a, b) {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  })
                  .slice(Math.max(dataMessages.length - 5, 0))
                  .map((message) => (
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
                          <Avatar alt="Temy Sharp" src={message.user.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={message.content || "message"}
                          secondary={message.user.pseudo}
                        />
                        {/* <ThumbUpIcon
           // onClick={onLike}
           color="disabled"
           fontSize="small"
           style={{ cursor: "pointer" }}
          /> */}
                      </ListItem>
                    </Paper>
                  ))}
              </div>
            </Slide>
          </List>
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
            <Grid container alignItems="center" justify="center">
              <Button type="button" onClick={() => setMessage(message + "😀")}>
                <span role="img" aria-label="donut">
                  😀
                </span>
              </Button>
              <Button type="button" onClick={() => setMessage(message + "😍")}>
                <span role="img" aria-label="donut">
                  😍
                </span>
              </Button>
              <Button type="button" onClick={() => setMessage(message + "🤣")}>
                <span role="img" aria-label="donut">
                  🤣
                </span>
              </Button>

              <Button type="button" onClick={() => setMessage(message + "🤘")}>
                <span role="img" aria-label="donut">
                  🤘
                </span>
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  variant="filled"
                  severity="success"
                >
                  Welcome {userdata.pseudo}
                </Alert>
              </Snackbar>
            </Grid>
          </form>
        </>
        // <>
        //   <Slide left>
        //     <List style={{ width: "500px" }}>
        //       {dataMessages
        //         // .filter((message) => message.userUuid === UserId)
        //         .sort(function (a, b) {
        //           return new Date(a.createdAt) - new Date(b.createdAt);
        //         })
        //         // .slice(Math.max(dataMessages.length - 5, 0))
        //         .map((message) =>
        //           dataMessages.indexOf(message) === dataMessages.length - 1 ? (
        //             <Slide left collapse>
        //               <Paper
        //                 elevation={4}
        //                 style={{ margin: 32, width: "300px" }}
        //                 className={
        //                   message.userUuid === UserId ? "paperMe" : "paperOther"
        //                 }
        //               >
        //                 <ListItem
        //                   alignItems="flex-start"
        //                   className={
        //                     message.userUuid === UserId ? "listMe" : "listOther"
        //                   }
        //                 >
        //                   {/* <ListItemAvatar>
        //                     <Avatar alt="Temy Sharp" src={message.user.avatar} />
        //                   </ListItemAvatar> */}
        //                   <ListItemText
        //                     primary={message.content}
        //                     secondary={message.user.pseudo}
        //                   />
        //                   {/* <ThumbUpIcon
        //                     // onClick={onLike}
        //                     color="disabled"
        //                     fontSize="small"
        //                     style={{ cursor: "pointer" }}
        //                   /> */}
        //                 </ListItem>
        //               </Paper>
        //             </Slide>
        //           ) : (
        //             <Paper
        //               elevation={4}
        //               style={{ margin: 32, width: "300px" }}
        //               className={
        //                 message.userUuid === UserId ? "paperMe" : "paperOther"
        //               }
        //             >
        //               <ListItem
        //                 alignItems="flex-start"
        //                 className={
        //                   message.userUuid === UserId ? "listMe" : "listOther"
        //                 }
        //               >
        //                 {/* <ListItemAvatar>
        //                   <Avatar alt="Temy Sharp" src={message.user.avatar} />
        //                 </ListItemAvatar> */}
        //                 <ListItemText
        //                   primary={message.content}
        //                   secondary={message.user.pseudo}
        //                 />
        //                 {/* <ThumbUpIcon
        //                   // onClick={onLike}
        //                   color="disabled"
        //                   fontSize="small"
        //                   style={{ cursor: "pointer" }}
        //                 /> */}
        //               </ListItem>
        //             </Paper>
        //           )
        //         )}
        //     </List>
        //   </Slide>
        //   <form autoComplete="off" onSubmit={postMessage}>
        //     <TextField
        //       style={{ margin: "20px" }}
        //       id="message"
        //       label="message"
        //       variant="outlined"
        //       value={message}
        //       onChange={(e) => setMessage(e.target.value)}
        //       autoFocus="autofocus"
        //     />
        //     {message ? (
        //       <Button
        //         type="submit"
        //         variant="contained"
        //         color="primary"
        //         style={{ margin: "20px" }}
        //       >
        //         Send
        //       </Button>
        //     ) : (
        //       <Button
        //         type="submit"
        //         variant="contained"
        //         color="primary"
        //         style={{ margin: "20px" }}
        //         disabled
        //       >
        //         Send
        //       </Button>
        //     )}
        //   </form>
        // </>
      )}
    </>
  );
}
