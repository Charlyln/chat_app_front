import React from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid, List, Paper } from "@material-ui/core";
import MyAppBar from "./AppBar/MyAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Posts() {
  const classes = useStyles();

  return (
    <>
      <MyAppBar />
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <List>
                <Paper elevation={4}>
                  <Card style={{ marginTop: "20px" }} className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          R
                        </Avatar>
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://www.pcgamewallpapers.net/1920x1080/grand-theft-auto-vice-city-05-artwork.jpg"
                      title="GTA"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing></CardActions>
                  </Card>
                </Paper>
                <Paper elevation={4}>
                  <Card style={{ marginTop: "20px" }} className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          R
                        </Avatar>
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://i.pinimg.com/originals/bf/f8/5d/bff85dc0c2bab061a7596296a61bc3f3.jpg"
                      title="GTA"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing></CardActions>
                  </Card>
                </Paper>
                <Paper elevation={4}>
                  {" "}
                  <Card style={{ marginTop: "20px" }} className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          R
                        </Avatar>
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://i1.wp.com/www.rockstarmag.fr/wp-content/uploads/2013/08/artwork-gta-vice-city-27.jpg?w=246&h=138&ssl=1"
                      title="GTA"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing></CardActions>
                  </Card>
                </Paper>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
}
