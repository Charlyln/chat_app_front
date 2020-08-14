import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import {
  TextField,
  Button,
  Avatar,
  Grid,
  Snackbar,
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Fade,
  ListItem,
  Paper
} from '@material-ui/core'
import Axios from 'axios'
import './messenger.css'
import { Redirect } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { apiUrl } from '../../apiUrl'
import MyAppBar from './AppBar/MyAppBar'
import HelpIcon from '@material-ui/icons/Help'
import SendIcon from '@material-ui/icons/Send'
import PhotoIcon from '@material-ui/icons/Photo'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import CardCollapse from './CardCollapse'

export default function Posts() {
  const [dataMessages, setdataPosts] = useState([])
  // const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [UserId] = useState(window.localStorage.getItem('uuid'))
  const [userdata, setuserdata] = useState([])
  const [open, setOpen] = useState(false)
  const [logo, setLogo] = useState('')
  const [postId, setPostId] = useState('')
  const [comment, setComment] = useState('')
  const [arrayPostId] = useState([])
  const [open2, setOpen2] = useState(false)
  const [photo, setPhoto] = useState(false)
  const [video, setVideo] = useState(false)
  const [imageDialog, setImageDialog] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [followData, setFollowDatas] = useState([])

  const handlePhotoOpen = () => {
    setOpen2(true)
    setPhoto(true)
    setVideo(false)
    setImageDialog('')
    setYoutubeUrl('')
  }

  const handlePostOpen = () => {
    setOpen2(true)
    setVideo(false)
    setPhoto(false)
    setYoutubeUrl('')
    setLogo('')
  }
  const handleVideoOpen = () => {
    setOpen2(true)
    setVideo(true)
    setPhoto(false)
    setImageDialog('')
    setLogo('')
  }

  const handleClose3 = () => {
    setOpen2(false)
  }

  const handleLogo = (e) => {
    if (e.target.files[0]) {
      setLogo(e.target.files[0])
      setImageDialog(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleClose = (event, reason) => {
    setOpen(false)
  }

  useEffect(() => {
    getPosts()
    getUser()
    getFollows()
  }, [])

  const getPosts = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/posts`)
      setdataPosts(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  const putLike = async (e) => {
    const id = e.target.id
    const likeObject = userdata.Likes.find((like) => like.PostUuid === id)
    if (likeObject) {
      const likeId = likeObject.id
      console.log(likeObject)

      await Axios.delete(`${apiUrl}/likes/${likeId}`)
    } else {
      await Axios.post(`${apiUrl}/likes`, {
        PostUuid: id,
        UserUuid: UserId
      })
    }

    getPosts()
    getUser()
  }

  const getFollows = async () => {
    try {
      const UserId = window.localStorage.getItem('uuid')
      const res = await Axios.get(`${apiUrl}/followers/${UserId}`)
      setFollowDatas(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const postComment = async (e) => {
    e.preventDefault()
    try {
      const UserId = window.localStorage.getItem('uuid')
      await Axios.post(`${apiUrl}/comments`, {
        content: comment,
        UserUuid: UserId,
        PostUuid: postId
      })

      setComment('')
    } catch (err) {
      console.log(err)
    }
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

  useEffect(() => {
    const interval = setInterval(() => {
      getPosts()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const openInfos = () => {
    setOpen(true)
  }

  const sendPost = async (e) => {
    e.preventDefault()
    const imgurToken = '44670bbff769f1a'

    try {
      if (logo && !youtubeUrl) {
        const res = await Axios.post('https://api.imgur.com/3/image', logo, {
          headers: {
            Authorization: `Client-ID ${imgurToken}`
          }
        })
        await Axios.post(`${apiUrl}/posts`, {
          content: message,
          UserUuid: UserId,
          imageUrl: res.data.data.link
        })
      } else if (youtubeUrl) {
        await Axios.post(`${apiUrl}/posts`, {
          content: message,
          UserUuid: UserId,
          imageUrl: youtubeUrl
        })
      } else {
        await Axios.post(`${apiUrl}/posts`, {
          content: message,
          UserUuid: UserId
        })
      }

      setMessage('')
      setLogo('')
      setOpen2(false)
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

      <Grid
        container
        alignItems="center"
        style={{ marginTop: '70px' }}
        className={open2 ? 'marginDialog' : ''}
        direction="column"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid container className="containerFixed">
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <Button
                      className="textField"
                      variant="outlined"
                      onClick={handlePostOpen}
                    >
                      Post
                    </Button>
                  </ListItem>
                  {/* <ListItem>
                    <TextField
                      className="textField"
                      variant="outlined"
                      onClick={handleClickOpen}
                      id="standard-read-only-input"
                      defaultValue="Post"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="post"
                      label="Post"
                      variant="outlined"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="textField"
                    />
                  </ListItem> */}
                  <ListItem>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handlePhotoOpen}
                      startIcon={<PhotoIcon />}
                    >
                      Photo
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<OndemandVideoIcon />}
                      style={{ marginLeft: '10px' }}
                      onClick={handleVideoOpen}
                    >
                      Video
                    </Button>
                  </ListItem>
                </List>
                <Dialog
                  open={open2}
                  keepMounted
                  onClose={handleClose3}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  maxWidth="xs"
                  fullWidth
                >
                  <DialogTitle
                    id="alert-dialog-slide-title"
                    style={{ alignSelf: 'center' }}
                  >
                    {'Create Post'}
                  </DialogTitle>

                  <DialogContent>
                    <TextField
                      fullWidth
                      autoFocus
                      id="postMessage"
                      label="Post"
                      variant="outlined"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </DialogContent>
                  {video ? (
                    <DialogContent>
                      <TextField
                        fullWidth
                        id="youtubeUrl"
                        value={youtubeUrl}
                        label="Youtube url"
                        variant="outlined"
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                    </DialogContent>
                  ) : (
                    ''
                  )}
                  {photo ? (
                    <DialogContent>
                      <Card>
                        <CardMedia
                          style={{ height: 0, paddingTop: '56.25%' }}
                          image={imageDialog}
                          title="Photo"
                        />
                      </Card>
                    </DialogContent>
                  ) : video ? (
                    <DialogContent>
                      <Paper elevation={5}>
                        <CardMedia title="video">
                          <iframe
                            title="oneVideo"
                            width="100%"
                            height="220"
                            src={youtubeUrl.replace('watch?v=', 'embed/')}
                          ></iframe>
                        </CardMedia>
                      </Paper>
                    </DialogContent>
                  ) : (
                    ''
                  )}

                  <DialogContent>
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                      files={logo}
                      onChange={handleLogo}
                    />

                    <label htmlFor="icon-button-file">
                      <Button
                        variant={photo ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={handlePhotoOpen}
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoIcon />
                      </Button>
                      {/* <IconButton
                        style={{
                          color: !message ? "grey" : logo ? "green" : "red",
                        }}
                        aria-label="upload picture"
                        component="span"
                        disabled={logo}
                      >
                        <PhotoCamera />
                        {logo ? <CheckIcon /> : <ClearIcon />}
                      </IconButton> */}
                    </label>

                    <Button
                      variant={video ? 'contained' : 'outlined'}
                      color="primary"
                      style={{ marginLeft: '10px' }}
                      onClick={handleVideoOpen}
                    >
                      <OndemandVideoIcon />
                    </Button>
                    <Button
                      variant={
                        open2 && !video && !photo ? 'contained' : 'outlined'
                      }
                      color="primary"
                      style={{ marginLeft: '10px' }}
                      onClick={handlePostOpen}
                    >
                      <InsertEmoticonIcon />
                    </Button>
                  </DialogContent>

                  <DialogActions style={{ alignSelf: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!message}
                      endIcon={<SendIcon />}
                      className="buttonSend"
                      onClick={sendPost}
                    >
                      Post
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {/* <List>
                <ListItem>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    files={logo}
                    onChange={handleLogo}
                    disabled={logo}
                  />

                  <label htmlFor="icon-button-file">
                    <IconButton
                      style={{
                        color: !message ? "grey" : logo ? "green" : "red",
                      }}
                      aria-label="upload picture"
                      component="span"
                      disabled={logo}
                    >
                      <PhotoCamera />
                      {logo ? <CheckIcon /> : <ClearIcon />}
                    </IconButton>
                  </label>
                  <ListItemAvatar>
                    {logo ? (
                      <Avatar
                        variant="square"
                        src={URL.createObjectURL(logo)}
                      />
                    ) : (
                      <Avatar variant="square">
                        <PhotoIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                </ListItem>
              </List> */}
            </Grid>

            {isLoading ? (
              ''
            ) : (
              <Snackbar
                open={open}
                autoHideDuration={20000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="info"
                  style={{ width: '330px' }}
                >
                  Welcome to the wall <strong>{userdata.pseudo}</strong> ! You
                  can send posts with or without image and see posts from users
                  you follow ! If you don't have any yet, go to the next page to
                  add some{' '}
                  <span role="img" aria-label="donut">
                    😀
                  </span>
                </Alert>
              </Snackbar>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid container alignItems="center" justify="center">
              {isLoading ? (
                <>
                  {/* <List style={{ width: "500px" }}>
                  <Fade top cascade>
                    {array.map((el) => (
                      <ListItem alignItems="flex-start">
                        <Skeleton
                          variant="rect"
                          width={500}
                          height={462}
                          className="paperOther"
                          style={{ width: '600px' }}
                        ></Skeleton>
                      </ListItem>
                    ))}
                  </Fade>
                </List> */}
                </>
              ) : (
                <>
                  {followData.length === 1 ? (
                    <Fade in={true}>
                      <List style={{ width: '500px' }}>
                        <Paper elevation={5}>
                          <Card
                            style={{
                              maxWidth: '500px',
                              margin: '20px 0px'
                            }}
                          >
                            <CardHeader
                              avatar={
                                <Avatar
                                  src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8bff6d42719331.57d51f37571d7.jpg"
                                  aria-label="recipe"
                                >
                                  R
                                </Avatar>
                              }
                              title="Eve"
                            />
                            <CardMedia
                              style={{ height: 0, paddingTop: '56.25%' }}
                              image="https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif"
                              title="Paella dish"
                            />

                            <CardContent>
                              <Typography>
                                {' '}
                                Welcome to the wall{' '}
                                <strong>{userdata.pseudo}</strong> ! You can
                                send posts with or without image and see posts
                                from users you follow ! If you don't have any
                                yet, go to the next page to add some{' '}
                                <span role="img" aria-label="donut">
                                  😀
                                </span>
                              </Typography>
                            </CardContent>
                          </Card>
                        </Paper>
                      </List>
                    </Fade>
                  ) : (
                    <Fade in={true}>
                      <List style={{ width: '500px' }}>
                        {dataMessages
                          .filter((message) =>
                            message.User.Followers.find(
                              (element) => element.followerId === UserId
                            )
                          )
                          .sort(function (a, b) {
                            return new Date(b.createdAt) - new Date(a.createdAt)
                          })

                          .map((message, i) => {
                            return (
                              <Paper elevation={5}>
                                <Card
                                  style={{
                                    maxWidth: '500px',
                                    margin: '20px 0px'
                                  }}
                                >
                                  <CardHeader
                                    avatar={
                                      <Avatar
                                        aria-label="recipe"
                                        src={message.User.avatar}
                                      >
                                        R
                                      </Avatar>
                                    }
                                    title={message.User.pseudo}
                                    subheader={message.createdAt.slice(0, 10)}
                                  />
                                  {message.imageUrl &&
                                  message.imageUrl.includes(
                                    'https://www.youtube.com'
                                  ) ? (
                                    <CardMedia title="video">
                                      <iframe
                                        title="otherVideo"
                                        width="100%"
                                        height="300"
                                        src={message.imageUrl.replace(
                                          'watch?v=',
                                          'embed/'
                                        )}
                                      ></iframe>
                                    </CardMedia>
                                  ) : message.imageUrl ? (
                                    <CardMedia
                                      style={{
                                        height: 0,
                                        paddingTop: '56.25%'
                                      }}
                                      image={message.imageUrl}
                                      title="Paella dish"
                                    />
                                  ) : (
                                    ''
                                  )}
                                  <CardContent>
                                    <Typography>{message.content}</Typography>
                                  </CardContent>

                                  <CardCollapse
                                    message={message}
                                    putLike={putLike}
                                    UserId={UserId}
                                    arrayPostId={arrayPostId}
                                    userdata={userdata}
                                    postComment={postComment}
                                    comment={comment}
                                    setComment={setComment}
                                    setPostId={setPostId}
                                  />
                                </Card>
                              </Paper>
                            )
                          })}
                      </List>
                    </Fade>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} style={{ textAlign: 'end' }}>
            <IconButton onClick={openInfos}>
              <HelpIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
