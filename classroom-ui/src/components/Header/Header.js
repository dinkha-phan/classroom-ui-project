import React from "react";
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
import { Add, Apps } from "@material-ui/icons";
import { useStyles } from "./style";
import { useState } from "react";
import { CreateClass, JoinClass,EditProfile } from "..";
import { useLocalContext } from "../../context/context";
const Header = ({ children }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);
    const { setShowProfile } = useLocalContext();

    const { setCreateClassDialog, setJoinClassDialog, loggedInUser,personJoinedClass ,
        tabValue, settabValue} = useLocalContext();
    console.log(loggedInUser);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClickAvatar = (event) => setAnchorElAvatar(event.currentTarget);

    const handleClose = () => { setAnchorEl(null); }
    const handleCloseAvatar = () => { setAnchorElAvatar(null); }

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
                            (personJoinedClass!=="") &&
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            <Tab
                                value="1"
                                label="Bản tin"
                                wrapped
                            />
                            <Tab value="2" label="Mọi người" />
                            
                        </Tabs>
                        }
                    </div>
                    <div className={classes.header__wrapper__right}>
                        <Add onClick={handleClick} className={classes.icon} />

                        <Apps className={classes.icon} />

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                        >
                            <MenuItem onClick={handleJoin}>Join Class</MenuItem>
                            <MenuItem onClick={handleCreate}>Create Class</MenuItem>
                        </Menu>
                        
                        <Avatar onClick={handleClickAvatar} className={classes.icon} />
                        <Menu
                            id="simple-menu"
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
            <EditProfile/>
            <JoinClass />
        </div>
    )
}

export default Header