import React, { useEffect } from "react";
import axios from 'axios';

import {
    AppBar,
    Avatar,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Tab,
    Tabs
} from "@material-ui/core";
import {

    getUrlAddOrGetNoti,
    CurrentUrlAPI
} from '../../services/app.service';
import { Add, Apps } from "@material-ui/icons";
import { useStyles } from "./style";
import { useState } from "react";
import { CreateClass, JoinClass, EditProfile } from "..";
import { useLocalContext } from "../../context/context";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationItem from './NotificationItem';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import Badge from '@mui/material/Badge';
import {getAccessToken}  from '../../services/app.service'; 

const Header = ({ children }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);
    const [anchorNotification, setAnchorNotification] = useState(null);
    const [anchorElMoreHoz, setAnchorElMoreHoz] = useState(null);
    const [numberUnread, setNumberUnread] = useState(0);
    const [listNotifitication, setListNotification] = useState([]);

    const { setShowProfile } = useLocalContext();

    const { setCreateClassDialog, setJoinClassDialog, loggedInUser, personJoinedClass,
        tabValue, settabValue, logout } = useLocalContext();
    console.log(loggedInUser);

    const listNoti = ["18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1",
        "18120116 đã bình luận về số điểm của mình tại bài tập 1"];

    useEffect(async () => {

        setListNotification([...listNoti]);


        const url2 = getUrlAddOrGetNoti(loggedInUser.id);
        const token = getAccessToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        await axios.get(url2, config).then((response) => {
            console.log("######### data notification", response.data);
            setListNotification([...response.data]);
        }).catch((error) => {
            console.log(error);
            window.location.href = 'http://localhost:3001/signin';
        });


    }, [])


    useEffect(async () => {

        let number = 0;
        listNotifitication.map(data => {
            if (data.Status === 0) number += 1;
        })
        setNumberUnread(number);

    }, [listNotifitication])

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClickAvatar = (event) => setAnchorElAvatar(event.currentTarget);
    const handleClickNotification = (event) => setAnchorNotification(event.currentTarget);

    const handleClose = () => { setAnchorEl(null); }
    const handleCloseAvatar = () => { setAnchorElAvatar(null); }
    const handleCloseMoreHoz = () => { setAnchorElMoreHoz(null); }
    const markAllAsRead = () => { setAnchorElMoreHoz(null); }


    const handleCloseNotification = () => { setAnchorNotification(null); }

    const handleCreate = () => {
        handleClose();
        setCreateClassDialog(true);
    }

    const handleJoin = () => {
        handleClose();
        setJoinClassDialog(true);
    }

    const handleChange = (event, newValue) => {
        settabValue(newValue);
    };

    const handleProfile = () => {
        setAnchorElAvatar(null);
        setShowProfile(true);
        console.log("Click Profile")
    }
    const handleLogout = () => {
        setAnchorElAvatar(null);
        console.log("handle Logout Here");
        logout();

    }
    const containerNotify = ({ children }) => {
        return (
            <div style={{ width: "20%", color: "#123456" }}>
                {children}
            </div>
        );
    }
    const getStudentID = (content) => {
        let word = [];
        if (content)
            word = content.split(' ');
        console.log("word", word);
        if (word.length > 0) return word[0];
        return "";
    }
    const handleClickComment = async (data) => {


        const url = CurrentUrlAPI + '/noti/' + data.NotiID;
        const token = getAccessToken();
        const config ={
            headers: { Authorization: `Bearer ${token}` }
        }
        await axios.put(url, config).then((response) => {
            console.log("handleClickComment", response);
        }).catch((error) => {
            console.log(error);
            window.location.href = 'http://localhost:3001/signin';
        });

        window.location.href = `..${data.LinkToClass}`;
        console.log(data);

    }
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.headerWrapper}>
                        {children}
                        <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="" />
                        <Typography variant="h6" className={classes.title}>
                            Classroom
                        </Typography>

                    </div>
                    <div className={classes.header__wrapper__center}>
                        {
                            (personJoinedClass !== "") &&
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                aria-label="wrapped label tabs example"
                                textColor="primary"
                                indicatorColor="primary"

                            >
                                <Tab
                                    value="1"
                                    label="Bảng tin"

                                    wrapped
                                />
                                <Tab value="2" label="Mọi người" />
                                <Tab value="3" label="Số điểm" />
                                {/* <Tab value="4" label="Bài tập" /> */}

                            </Tabs>
                        }
                    </div>
                    <div className={classes.header__wrapper__right}>
                        <IconButton>
                            <Add onClick={handleClick} />
                        </IconButton>


                        {/* <Apps className={classes.icon} /> */}

                        <Menu
                            // id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                        >
                            <MenuItem onClick={handleJoin}>Join Class</MenuItem>
                            <MenuItem onClick={handleCreate}>Create Class</MenuItem>
                        </Menu>
                        <IconButton onClick={handleClickNotification}>
                            <Badge color="primary" badgeContent={numberUnread} size="small">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <Menu
                            // id="simple-menu"
                            anchorEl={anchorNotification}
                            keepMounted
                            open={Boolean(anchorNotification)}
                            onClose={handleCloseNotification}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                        >
                            {(listNotifitication.length > 0) ?
                                <>
                                    <List sx={{ width: '300px', maxHeight: "400px", bgcolor: 'background.paper' }}>
                                        {/* <div style={{ position: "absolute", right: 0, top: 0 }}>
                                            <IconButton sx={{ color: "black" }} onClick={(event) => setAnchorElMoreHoz(event.currentTarget)}>
                                                <MoreHorizIcon />
                                            </IconButton>
                                            <Menu
                                                // id="simple-menu"
                                                anchorEl={anchorElMoreHoz}
                                                keepMounted
                                                open={Boolean(anchorElMoreHoz)}
                                                onClose={handleCloseMoreHoz}
                                                // transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                                                // anchorOrigin={{
                                                //     vertical: 'bottom',
                                                //     horizontal: 'right',
                                                // }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                style={{ marginTop: 40, marginLeft: 40 }}
                                            >
                                                <MenuItem onClick={markAllAsRead}> Đánh dấu tất cả là đã đọc    <CheckIcon sx={{ ml: 1 }} /></MenuItem>
                                            </Menu>
                                        </div> */}
                                        {
                                            listNotifitication.map((data) => {
                                                return (
                                                    <div
                                                        className={(data.Status === 0) ? classes.comment_unread : classes.comment_readed}

                                                        onClick={() => handleClickComment(data)}
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <MessageOutlinedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText >
                                                            <p style={{ fontSize: 14, color: "black" }}>
                                                                {getStudentID(data.Content).toString()}
                                                            </p>
                                                            <p style={{ fontSize: 11 }}>
                                                                {data.Content}
                                                            </p>
                                                        </ListItemText>
                                                    </div>
                                                );
                                            })
                                        }
                                    </List>
                                </>
                                :
                                <>
                                    <MenuItem>
                                        <NotificationItem>
                                            Không có thông báo nào dành cho bạn
                                        </NotificationItem>
                                    </MenuItem>
                                </>}
                            {/* <MenuItem onClick={() => { }}>xxx</MenuItem>
                            <MenuItem onClick={() => { }}>xxx</MenuItem> */}
                        </Menu>
                        <IconButton>
                            <Avatar onClick={handleClickAvatar} />
                        </IconButton>

                        <Menu
                            // id="simple-menu"
                            anchorEl={anchorElAvatar}
                            keepMounted
                            open={Boolean(anchorElAvatar)}
                            onClose={handleCloseAvatar}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                        >
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </Menu>


                    </div>
                </Toolbar>
            </AppBar>
            <CreateClass />
            <EditProfile />
            <JoinClass />
        </div >
    )
}

export default Header