import { Avatar, MenuItem, Menu } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useLocalContext } from "../../context/context";
import { useStyles } from "./style";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// ClassID: "bbb2eed3-65c7-4677-8c07-63f3a749b741"
// Code: "bbb2eed3-65c7-4677-8c07-63f3a749b741"
// LinkToJoinClass: "https://classroom-project/joinClass/bbb2eed3-65c7-4677-8c07-63f3a749b741"
// Name: "KTPM"
// Part: ""
// Role: "student"
// Room: "Room 1"
// Title: ""
// UserID: "18120127"
const JoinedClasses = ({ classData }) => {
    const classes = useStyles()
    const [anchorEl2, setAnchorEl2] = useState(null);

    const { personJoinedClass,setPersonJoinedClass, settabValue } = useLocalContext();
    const handleClick = (role) => {
        if (role === "student") setPersonJoinedClass("Student");
        else setPersonJoinedClass("Teacher");
        settabValue("1");
    };
    const handleClickAdd = (event) => setAnchorEl2(event.currentTarget);
    const handleClose = () => { setAnchorEl2(null); }
    return (
        <li className="joined__list">
            <div className="joined__wrapper">
                <div className="joined__container">
                    <div className="joined__imgWrapper" />
                    <div className="joined__image" />
                    <div className="joined__content">
                        <div className="main_list_header_start">
                            <Link className="joined__title" to={`/${classData.Role}/${classData.ClassID}`} onClick={() => handleClick(classData.Role)}>
                                <h2>{classData.Name}</h2>
                            </Link>
                            <div style={{ display: "flex", color: "white", cursor: "pointer" }}>
                                <MoreVertIcon className="right"
                                    onClick={handleClickAdd}
                                />
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl2}
                                    keepMounted
                                    open={Boolean(anchorEl2)}
                                    onClose={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                                >
                                    <MenuItem
                                    //  onClick={handleJoin}
                                    >
                                        Sao chép đường liên kết mời</MenuItem>
                                    <MenuItem
                                    // onClick={handleCreate}
                                    >Chỉnh sửa</MenuItem>
                                    {classData.Role === "teacher" &&
                                        <MenuItem
                                        // onClick={handleDelete}
                                        >Hủy đăng ký</MenuItem>
                                    }
                                </Menu>
                            </div>
                        </div>

                        <p className="joined__owner"> Auther class </p>
                    </div>
                </div>
                <Avatar
                    className="joined__avatar"
                    src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
                />
            </div>
            <div className="joined__bottom">
                <PermContactCalendar />
                <FolderOpen />
            </div>
        </li>
    );
};

export default JoinedClasses;
