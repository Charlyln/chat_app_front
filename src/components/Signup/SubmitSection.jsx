import { Button, CircularProgress, Grid } from '@material-ui/core'
import React from 'react'

import CheckIcon from '@material-ui/icons/Check'
import SendIcon from '@material-ui/icons/Send'

const SubmitSection = ({signupLoading,signupSuccess   }) => {
  return (
    <>
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
        </Grid>
      </Grid>
    </>
  )
}

export default SubmitSection
