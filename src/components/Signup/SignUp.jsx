import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  Grid,
  CircularProgress
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { Toolbar, AppBar } from '@material-ui/core'
import { apiUrl } from '../../apiUrl'
import SnackBarSection from './SnackBarSection'
import AvatarSection from './AvatarSection'
import SubmitSection from './SubmitSection'



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
  // const [redirect, setRedirect] = useState(false)

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
        }, 2000)

        const timer2 = setTimeout(() => {
          setSignupSuccess(true)
          // setRedirect(true)
        }, 2000)

        return () => clearTimeout(timer1, timer2)
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

  if (!isLoading && userdata && window.localStorage.getItem('uuid')) {
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
            <AvatarSection
              handleLogo={handleLogo}
              logo={logo}
              getAvatar={getAvatar}
            />

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

                <SnackBarSection
                  open2={open2}
                  setOpen2={setOpen2}
                  open3={open3}
                  setOpen3={setOpen3}
                  open4={open4}
                  setOpen4={setOpen4}
                />
              </Grid>
            </Grid>
            <SubmitSection
              signupLoading={signupLoading}
              signupSuccess={signupSuccess}
            />
          </Grid>
        </form>
      )}
    </>
  )
}

export default SignUp
