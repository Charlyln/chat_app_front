import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Snackbar,
  Avatar,
  Grid,
  CircularProgress
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { Toolbar, AppBar } from '@material-ui/core'
import { apiUrl } from '../../apiUrl'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'
import SendIcon from '@material-ui/icons/Send'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SignUp = () => {
  const [pseudo, setPseudo] = useState('')
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [logo, setLogo] = useState('')
  const [myAvatar, setMyAvatar] = useState('')
  const [isLoading, setisLoading] = useState(true)
  const [userdata, setuserdata] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const getMyAvatar = async () => {
    const imgurToken = '44670bbff769f1a'
    const res = await Axios.post('https://api.imgur.com/3/image', myAvatar, {
      headers: {
        Authorization: `Client-ID ${imgurToken}`
      }
    })
    setLogo(res.data.data.link)
    setMyAvatar('')
  }

  if (myAvatar) {
    getMyAvatar()
  }

  const getUser = async () => {
    const id = window.localStorage.getItem('uuid')

    try {
      const res = await Axios.get(`${apiUrl}/users/${id}`)
      setuserdata(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      const timer = setTimeout(() => {
        setisLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const Signup = async (e) => {
    e.preventDefault()

    try {
      if (logo && pseudo) {
        setSignupLoading(true)
        const res = await axios.post(`${apiUrl}/users`, {
          pseudo,
          avatar: logo
        })
        window.localStorage.setItem('uuid', res.data.uuid)
        await axios.post(`${apiUrl}/followers`, {
          UserUuid: res.data.uuid,
          followerId: res.data.uuid
        })
        getUser()
        const timer1 = setTimeout(() => {
          setSignupLoading(false)
        }, 1000)
        setSignupSuccess(true)

        const timer2 = setTimeout(() => {
          setSignupSuccess(false)
          setRedirect(true)
        }, 3000)

        return () => clearTimeout(timer2, timer1)
      } else if (pseudo && !logo) {
        setOpen2(true)
      } else if (!pseudo && logo) {
        setOpen3(true)
      } else {
        setOpen4(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogo = (e) => {
    setMyAvatar(e.target.files[0])
  }

  const getAvatar = () => {
    Axios.get(`https://randomuser.me/api`).then((res) =>
      setLogo(res.data.results[0].picture.large)
    )
  }

  if (
    !isLoading &&
    userdata &&
    window.localStorage.getItem('uuid') &&
    redirect
  ) {
    return <Redirect to="/posts" />
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>

      {isLoading ? (
        <Grid container alignItems="center" style={{ height: '70%' }}>
          <Grid item xs={12} style={{ marginTop: '80px' }}>
            <Grid container alignItems="center" justify="center">
              <CircularProgress />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <form autoComplete="off" onSubmit={Signup}>
          <Grid container alignItems="center" style={{ height: '70%' }}>
            <Grid item xs={12} style={{ marginTop: '80px' }}>
              <Grid container alignItems="center" justify="center">
                {isLoading ? 'loading' : ''}
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  type="file"
                  files={logo}
                  onChange={handleLogo}
                  multiple
                />
                <label htmlFor="contained-button-file">
                  <Button
                    startIcon={<CloudUploadIcon />}
                    variant="outlined"
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>

                <Button
                  color="primary"
                  variant="outlined"
                  onClick={getAvatar}
                  startIcon={<PersonIcon />}
                >
                  Random
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '50px' }}>
              <Grid container alignItems="center" justify="center">
                <Avatar
                  alt="Temy Sharp"
                  src={logo}
                  style={{ width: '70px', height: '70px' }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '50px' }}>
              <Grid container alignItems="center" justify="center">
                <TextField
                  style={{ margin: '20px' }}
                  id="message"
                  label="Pseudo"
                  variant="outlined"
                  autoFocus="autofocus"
                  onChange={(e) => setPseudo(e.target.value)}
                />

                <Snackbar
                  open={open2}
                  autoHideDuration={2000}
                  onClose={() => setOpen2(false)}
                >
                  <Alert severity="info">
                    Select a picture{' '}
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
                    Put your pseudo{' '}
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
                    Put your pseudo and select a picture{' '}
                    <span role="img" aria-label="donut">
                      😀
                    </span>
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '50px' }}>
              <Grid container alignItems="center" justify="center">
                {signupLoading ? (
                  <Button
                    style={{
                      width: '90px',
                      height: '35px'
                    }}
                    variant="contained"
                    color="primary"
                    disabled={signupLoading}
                  >
                    <CircularProgress size={23} />
                  </Button>
                ) : signupSuccess ? (
                  <Button
                    style={{
                      backgroundColor: '#4caf50',
                      width: '90px',
                      height: '35px'
                    }}
                    variant="contained"
                    endIcon={<CheckIcon />}
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    style={{
                      width: '90px',
                      height: '35px'
                    }}
                    variant="contained"
                    color="primary"
                    disabled={signupLoading}
                    endIcon={<SendIcon />}
                  >
                    Join
                  </Button>
                )}

                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: '20px' }}
                >
                  Join
                </Button> */}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  )
}

export default SignUp
