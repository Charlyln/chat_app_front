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
} from "@material-ui/core";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import "./messenger.css";
import { Redirect } from "react-router-dom";
import Slide from "react-reveal";
import Alert from "@material-ui/lab/Alert";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export default function Messenger() {
  const [dataMessages, setdataMessages] = useState([]);
  // const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [UserId] = useState(window.localStorage.getItem("uuid"));
  const [userdata, setuserdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const array = [1, 2, 3, 4, 5];


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
      const res = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/messages`
      );
      setdataMessages(res.data);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.log(err);
    }
  };

  const putLike = (e) => {
    const id = e.target.id;
    const nbLike = e.target.name;
    console.log(nbLike);

    setLike(!like);

    if (!nbLike) {
      Axios.put(`https://mychatappmessenger.herokuapp.com/messages/${id}`, {
        likes: 1,
      });
    } else if (nbLike && like) {
      Axios.put(`https://mychatappmessenger.herokuapp.com/messages/${id}`, {
        likes: nbLike - 1,
      });
    } else {
      Axios.put(
        `https://mychatappmessenger.herokuapp.com/messages/${id}/click`
      );
    }
    getMessages();
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
        UserUuid: UserId,
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
              .sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
              })
              .slice(Math.max(dataMessages.length - 5, 0))
              .map((message) => (
                <Paper
                  elevation={4}
                  style={{ margin: 32, width: "300px" }}
                  className={
                    message.UserUuid === UserId ? "paperMe" : "paperOther"
                  }
                >
                  <ListItem
                    alignItems="flex-start"
                    className={
                      message.UserUuid === UserId ? "listMe" : "listOther"
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt="Temy Sharp" src={message.User.avatar} />
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
                          onClick={putLike}
                        />
                      }
                      label={message.likes || ""}
                    />
                  </ListItem>
                </Paper>
              ))}
          </List>
        </>
        // <>
        //   <Slide left>
        //     <List style={{ width: "500px" }}>
        //       {dataMessages
        //         // .filter((message) => message.UserUuid === UserId)
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
        //                   message.UserUuid === UserId ? "paperMe" : "paperOther"
        //                 }
        //               >
        //                 <ListItem
        //                   alignItems="flex-start"
        //                   className={
        //                     message.UserUuid === UserId ? "listMe" : "listOther"
        //                   }
        //                 >
        //                   {/* <ListItemAvatar>
        //                     <Avatar alt="Temy Sharp" src={U.avatar} />
        //                   </ListItemAvatar> */}
        //                   <ListItemText
        //                     primary={message.content}
        //                     secondary={U.pseudo}
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
        //                 message.UserUuid === UserId ? "paperMe" : "paperOther"
        //               }
        //             >
        //               <ListItem
        //                 alignItems="flex-start"
        //                 className={
        //                   message.UserUuid === UserId ? "listMe" : "listOther"
        //                 }
        //               >
        //                 {/* <ListItemAvatar>
        //                   <Avatar alt="Temy Sharp" src={U.avatar} />
        //                 </ListItemAvatar> */}
        //                 <ListItemText
        //                   primary={message.content}
        //                   secondary={U.pseudo}
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
            style={{ margin: "27px 0px" }}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "27px 0px" }}
            disabled
            endIcon={<Icon>send</Icon>}
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
                Welcome to the chat app <strong>{userdata.pseudo}</strong> ! You
                can send messages and receive messages from your friends. Enjoy{" "}
                <span role="img" aria-label="donut">
                  😀
                </span>
              </Alert>
            </Snackbar>
          )}{" "}
        </Grid>
      </form>
    </>
  );
}
