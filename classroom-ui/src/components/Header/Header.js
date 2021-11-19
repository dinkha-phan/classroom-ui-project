import React from "react";
import {
    AppBar,
    Avatar,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { Add, Apps } from "@material-ui/icons";
import { useStyles } from "./style";
import { useState } from "react";
import { CreateClass } from "..";
import { useLocalContext } from "../../context/context";


const Header = ({ children }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const { setCreateClassDialog } = useLocalContext();

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => { setAnchorEl(null); }

    const handleCreate = () => {
        handleClose();
        setCreateClassDialog(true);
    }

    const handleJoin = () => {

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

                        <div>
                            <Avatar className={classes.icon} />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <CreateClass />
        </div>
    )
}

export default Header