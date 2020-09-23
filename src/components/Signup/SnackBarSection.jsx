import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React from 'react'

const SnackBarSection = ({
  open2,
  setOpen2,
  open3,
  setOpen3,
  open4,
  setOpen4
}) => {
  return (
    <>
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
    </>
  )
}

export default SnackBarSection
