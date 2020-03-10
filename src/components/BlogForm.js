import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: 275,
    marginBottom: 10
  },
  title: {
    fontSize: 14,
  },
})

const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
  toggleVisibility
}) => {
  const classes = useStyles();

  return(
    <Card className={classes.root} >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
          create new note
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            label="title"
            fullWidth
          />
          <TextField
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            label="author"
            fullWidth
          />
          <TextField
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}
            label="url"
            fullWidth
          />
      <CardActions>
        <Button variant="outlined" color="inherit" type="submit">create</Button>
        <Button variant="outlined" color="secondary" onClick={toggleVisibility}>cancel</Button>
      </CardActions>
      </form>
      </CardContent>
    </Card>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm