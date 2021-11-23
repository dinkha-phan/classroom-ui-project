import * as React from 'react';
import { useState, useContext, useEffect, createContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import "./style.css";
import { useLocalContext } from "../../context/context"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {InvitePeople} from ".."
export default function AlignItemsList() {


    const listStudents = [{ name: "Phan Dinh Kha" }, { name: "Nguyen Tien Dat" }, { name: "Tran Bao Nguyen" }];
    const listTeachers = [{ name: "Phan Dinh Kha" }, { name: "Nguyen Tien Dat" }, { name: "Tran Bao Nguyen" }];
    const { personJoinedClass,
        showInvitePeople, setShowInvitePeople } = useLocalContext();
    const [label, setLabel] = useState("");
    const handleOnclickAddTeacher = ()=>{
        console.log("AddTeacher");
        setLabel("Invite Teacher");
        setShowInvitePeople(true);
    }
    const handleOnclickAddStudent = ()=>{
        console.log("AddStudent");
        setLabel("Invite Student");
        setShowInvitePeople(true);
    }
    return (
        <>
            <div className="main">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    subheader={
                        <>
                            <div className="main_list_header_start">
                                <ListSubheader component="div" id="nested-list-subheader" color="primary" >
                                    <p style={{color: "#1976d2", fontSize:"18px"}}>Teacher</p>
                                </ListSubheader>
                                {personJoinedClass === "Teacher" &&
                                    <div className="main_list_header_end">
                                        <IconButton aria-label="add people" onClick={() => handleOnclickAddTeacher()}>
                                            <GroupAddIcon />
                                        </IconButton>

                                    </div>
                                }
                            </div>
                        </>
                    }
                >

                    {listTeachers.map((item) => (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="center" justify-content="center">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    ))}
                </List>
            </div>
            <div className="main">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    subheader={
                        <>
                            <div className="main_list_header_start">
                                <ListSubheader component="div" id="nested-list-subheader" color="primary">
                                <p style={{color: "#1976d2", fontSize:"18px"}}>Student</p>
                                </ListSubheader>
                                {personJoinedClass === "Teacher" &&
                                    <div className="main_list_header_end">
                                        <IconButton aria-label="add people" onClick={() => handleOnclickAddStudent()}>
                                            <GroupAddIcon />
                                        </IconButton>
                                    </div>
                                }
                            </div>
                        </>
                    }
                >
                    {listStudents.map((item) => (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="center" justify-content="center">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    ))}
                </List>
                {showInvitePeople && <InvitePeople Label={label}/>}
            </div>
        </>
    );
}
