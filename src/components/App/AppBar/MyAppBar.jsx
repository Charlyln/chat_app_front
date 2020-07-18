import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Axios from "axios";
import { Avatar } from "@material-ui/core";
import Zoom from "react-reveal";
import { apiUrl } from "../../../apiUrl";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

// import HistoryIcon from '@material-ui/icons/History';
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import { Badge } from "@material-ui/core";
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';

export default function MyAppBar() {
  const [isLoading, setisLoading] = useState(true);
  const [userdata, setuserdata] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const id = window.localStorage.getItem("uuid");

    try {
      const res = await Axios.get(`${apiUrl}/users/${id}`);
      setuserdata(res.data);
      setisLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Zoom top>
          <Avatar
            alt="Temy Sharp"
            src={isLoading ? "" : userdata.avatar}
            style={{ width: "50px", height: "50px" }}
          />
        </Zoom>
        <Link to="/wall">
          <IconButton
            style={{ marginLeft: "10px" }}
            color="white"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <IconButton color="white" aria-label="menu">
            <GroupAddIcon />
          </IconButton>
        </Link>
        <Link to="/messenger">
          <IconButton color="white" aria-label="menu">
            <QuestionAnswerIcon />
          </IconButton>
        </Link>

        {/* <IconButton style={{marginLeft: "10px"}}  color="primary" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <IconButton  color="inherit" aria-label="menu">
          <HistoryIcon />
        </IconButton> */}
        {/* 
    <IconButton edge="start" color="inherit" aria-label="menu">
    <HomeIcon />
    </IconButton>
    <IconButton aria-label="show 4 new mails" color="inherit">
    <Badge badgeContent={4} color="secondary">
    <MailIcon />
    </Badge>
    </IconButton>
    <IconButton aria-label="show 17 new notifications" color="inherit">
    <Badge badgeContent={17} color="secondary">
    <NotificationsIcon />
    </Badge>
    </IconButton>
    <IconButton
    edge="end"
    aria-label="account of current user"
    // aria-controls={menuId}
    aria-haspopup="true"
    // onClick={handleProfileMenuOpen}
    color="inherit"
    >
    <AccountCircle />
    </IconButton>
  <IconButton
  aria-label="show more"
  // aria-controls={mobileMenuId}
    aria-haspopup="true"
    // onClick={handleMobileMenuOpen}
    color="inherit"
  >
  <MoreIcon />
  </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}
