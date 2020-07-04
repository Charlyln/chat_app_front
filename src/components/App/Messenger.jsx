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
} from "@material-ui/core";
import Axios from "axios";
import "./messenger.css";
import { Redirect } from "react-router-dom";
import Slide from "react-reveal";

export default function Test() {
  const [dataMessages, setdataMessages] = useState([]);
  // const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [UserId] = useState(window.localStorage.getItem("uuid"));

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      // const UserId = window.localStorage.getItem("uuid");
      const res = await Axios.get(
        `https://mychatappmessenger.herokuapp.com/messages`
      );
      setdataMessages(res.data);
      // const resUsers = await Axios.get(
      //   `https://mychatappmessenger.herokuapp.com/users/${UserId}`
      // );
      // setUserData(resUsers.data);
      setIsLoading(false);
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

  const fetchData = async (e) => {
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
        //   <form autoComplete="off" onSubmit={fetchData}>
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
