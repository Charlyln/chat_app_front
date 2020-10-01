import React, { useState } from 'react'
import {
  Button,
  CardContent,
  CardActions,
  FormControlLabel,
  Checkbox,
  Collapse,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  List,
  ListItemSecondaryAction,
  IconButton,
  Snackbar
} from '@material-ui/core'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
import { apiUrl } from '../apiUrl'
import Alert from '@material-ui/lab/Alert'
import CommentInput from './CommentInput'

const CardCollapse = ({
  message,
  UserId,
  putLike,
  userdata,
  getPosts,
  postId
}) => {
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const deleteComment = async (uuid) => {
    await Axios.delete(`${apiUrl}/comments/${uuid}`)
    getPosts()
    handleOpen()
  }

  return (
    <>
      <CardActions disableSpacing>
        <FormControlLabel
          className="like"
          control={
            <Checkbox
              icon={<FavoriteBorder fontSize="small" />}
              checkedIcon={<Favorite fontSize="small" />}
              id={message.uuid}
              name={message.likes}
              onChange={putLike}
              checked={
                message.Likes.find((like) => like.UserUuid === UserId)
                  ? true
                  : false
              }
            />
          }
          label={message.Likes.length > 0 ? message.Likes.length : ''}
        />
        <Button
          style={{ marginLeft: 'auto' }}
          onClick={handleExpandClick}
          size="small"
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >{`${message.Comments.length} comments`}</Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            {message.Comments.length > 0 ? (
              <>
                {message.Comments.sort(function (a, b) {
                  return new Date(a.createdAt) - new Date(b.createdAt)
                }).map((comment) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={comment.User.pseudo}
                        src={comment.User.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.User.pseudo}
                      secondary={comment.content}
                    />
                    <ListItemText
                      style={{ textAlign: 'end' }}
                      secondary={comment.createdAt.slice(0, 10)}
                    />
                    {comment.UserUuid === UserId ? (
                      <ListItemSecondaryAction>
                        <IconButton
                          size="small"
                          aria-label="settings"
                          onClick={() => deleteComment(comment.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    ) : (
                      ''
                    )}
                  </ListItem>
                ))}
              </>
            ) : (
              ''
            )}
            <CommentInput
              postId={postId}
              userdata={userdata}
              message={message}
            />
          </List>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleClose} severity="success" variant="filled">
              Comment deleted !
            </Alert>
          </Snackbar>
        </CardContent>
      </Collapse>
    </>
  )
}

export default CardCollapse
