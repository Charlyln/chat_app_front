import { Avatar, Button, Grid } from '@material-ui/core'
import React from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import PersonIcon from '@material-ui/icons/Person'

const AvatarSection = ({ handleLogo, logo, getAvatar }) => {
  return (
    <>
      <Grid item xs={12} style={{ marginTop: '80px' }}>
        <Grid container alignItems="center" justify="center">
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
              style={{ margin: '2px' }}
            >
              Upload
            </Button>
          </label>
          <Button
            color="primary"
            variant="outlined"
            onClick={getAvatar}
            startIcon={<PersonIcon />}
            style={{ margin: '2px' }}
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
    </>
  )
}

export default AvatarSection
