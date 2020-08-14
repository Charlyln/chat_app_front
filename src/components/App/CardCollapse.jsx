import React, { useState } from 'react'
import {
  TextField,
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
  ListItemSecondaryAction
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const CardCollapse = ({
  message,
  arrayPostId,
  UserId,
  putLike,
  userdata,
  postComment,
  comment,
  setComment,
  setPostId
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
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
                    <ListItemSecondaryAction>
                      <ListItemText
                        secondary={comment.createdAt.slice(0, 10)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </>
            ) : (
              ''
            )}
            <ListItem alignItems="flex-end">
              <ListItemAvatar>
                <Avatar alt={userdata.pseudo} src={userdata.avatar} />
              </ListItemAvatar>
              <form onSubmit={postComment}>
                <TextField
                  id="outlined-basic"
                  label="Comment"
                  variant="outlined"
                  value={comment}
                  size="small"
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!comment}
                  endIcon={<SendIcon />}
                  size="small"
                  onClick={() => setPostId(message.uuid)}
                  style={{
                    margin: '5px 0px 0px 10px'
                  }}
                >
                  Send
                </Button>
              </form>
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </>
  )
}

export default CardCollapse
