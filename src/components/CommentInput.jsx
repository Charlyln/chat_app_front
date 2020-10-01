import React, { useState } from 'react'
import Axios from 'axios'
import { apiUrl } from '../apiUrl'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  TextField
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const CommentInput = ({ postId, userdata, setPostId, message }) => {
  const [comment, setComment] = useState('')

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

  return (
    <>
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
            style={{
              margin: '5px 0px 0px 10px'
            }}
          >
            Send
          </Button>
        </form>
      </ListItem>
    </>
  )
}

export default CommentInput
