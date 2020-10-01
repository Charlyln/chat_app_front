import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  Paper,
  TextField,
  Button,
  ListItemAvatar,
  Avatar,
  Grid,
  Snackbar,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@material-ui/core'
import Axios from 'axios'
import Skeleton from '@material-ui/lab/Skeleton'
import './messenger.css'
import { Redirect } from 'react-router-dom'
import Slide from 'react-reveal'
import Alert from '@material-ui/lab/Alert'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { apiUrl } from '../apiUrl'
import HelpIcon from '@material-ui/icons/Help'
import MyAppBar from './AppBar/MyAppBar'
import SendIcon from '@material-ui/icons/Send'
import DeleteIcon from '@material-ui/icons/Delete'

export default function Messenger() {
  const [dataMessages, setdataMessages] = useState([])
  // const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [UserId] = useState(window.localStorage.getItem('uuid'))
  const [userdata, setuserdata] = useState([])
  const [open, setOpen] = useState(false)
  const [deletePostok, setDeletePostok] = useState(false)
  const array = [1, 2, 3, 4, 5]
  const emojis = [
    {
      logo: '😀'
    },
    {
      logo: '😍'
    },
    {
      logo: '🤣'
    },
    {
      logo: '🤘'
    }
  ]

  const handleClose = (event, reason) => {
    setOpen(false)
  }

  const handleCloseDeleteMessage = () => {
    setDeletePostok(false)
  }

  const openInfos = () => {
    setOpen(true)
  }

  useEffect(() => {
    getMessages()
    getUser()
  }, [])

  const getMessages = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/messages`)
      setdataMessages(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  const putLike = async (e) => {
    const id = e.target.id
    const likeObject = userdata.Likes.find((like) => like.MessageUuid === id)
    if (likeObject) {
      const likeId = likeObject.id

      await Axios.delete(`${apiUrl}/likes/${likeId}`)
    } else {
      await Axios.post(`${apiUrl}/likes`, {
        MessageUuid: id,
        UserUuid: UserId
      })
    }

    getMessages()
    getUser()
  }

  const getUser = async () => {
    const id = window.localStorage.getItem('uuid')
    try {
      const res = await Axios.get(`${apiUrl}/users/${id}`)
      setuserdata(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteMessage = async (uuid) => {
    await Axios.delete(`${apiUrl}/messages/${uuid}`)
    getMessages()
    setDeletePostok(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const postMessage = async (e) => {
    e.preventDefault()
    try {
      const UserId = window.localStorage.getItem('uuid')
      await Axios.post(`${apiUrl}/messages`, {
        content: message,
        UserUuid: UserId
      })
      const res = await Axios.get(`${apiUrl}/messages`)
      setdataMessages(res.data)
      setMessage('')
      // setFirstMessage(true)
    } catch (err) {
      console.log(err)
    }
  }

  if (!window.localStorage.getItem('uuid')) {
    return <Redirect to="/" />
  }
  return (
    <>
      <MyAppBar />

      <Grid container alignItems="center" style={{ marginTop: '70px' }}>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: 'end' }}>
            <IconButton>
              <HelpIcon onClick={openInfos} />
              <Snackbar
                open={deletePostok}
                autoHideDuration={4000}
                onClose={handleCloseDeleteMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert
                  onClose={handleCloseDeleteMessage}
                  severity="success"
                  variant="filled"
                >
                  Message deleted !
                </Alert>
              </Snackbar>
            </IconButton>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid container alignItems="center" justify="center">
              {isLoading ? (
                <>
                  <List style={{ width: '500px', marginTop: '17px' }}>
                    <Slide top cascade>
                      {array.map((el) => (
                        <ListItem alignItems="flex-start">
                          <Skeleton
                            variant="rect"
                            height={72}
                            className="paperOther skeleton"
                            style={{ margin: '8px 16px' }}
                          ></Skeleton>
                        </ListItem>
                      ))}
                    </Slide>
                  </List>
                </>
              ) : (
                <>
                  <List style={{ width: '500px' }}>
                    {dataMessages
                      .sort(function (a, b) {
                        return new Date(a.createdAt) - new Date(b.createdAt)
                      })
                      .slice(Math.max(dataMessages.length - 5, 0))
                      .map((message) => (
                        <Paper
                          elevation={4}
                          style={{ margin: 32 }}
                          className={
                            message.UserUuid === UserId
                              ? 'paperMe'
                              : 'paperOther'
                          }
                        >
                          <ListItem
                            alignItems="flex-start"
                            className={
                              message.UserUuid === UserId
                                ? 'listMe'
                                : 'listOther'
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Temy Sharp"
                                src={message.User.avatar}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={message.content || 'message'}
                              secondary={message.User.pseudo}
                            />

                            <FormControlLabel
                              labelPlacement="start"
                              className="like"
                              control={
                                <>
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
                                </>
                              }
                              label={
                                message.Likes.length > 0
                                  ? message.Likes.length
                                  : ''
                              }
                            />
                            {message.UserUuid === UserId ? (
                              <IconButton
                                style={{ margin: '3px 0px' }}
                                size="small"
                                aria-label="settings"
                                onClick={() => deleteMessage(message.uuid)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            ) : (
                              ''
                            )}
                          </ListItem>
                        </Paper>
                      ))}
                  </List>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid container>
              <form autoComplete="off" onSubmit={postMessage}>
                <TextField
                  style={{ margin: '20px' }}
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
                  style={{ margin: '27px 0px' }}
                  endIcon={<SendIcon />}
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
                    ''
                  ) : (
                    <Snackbar
                      open={open}
                      autoHideDuration={10000}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
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
                        style={{ width: '330px' }}
                      >
                        Here you can send messages and receive messages from
                        other people. You can only see the last five{' '}
                        <span role="img" aria-label="donut">
                          😀
                        </span>
                      </Alert>
                    </Snackbar>
                  )}{' '}
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
