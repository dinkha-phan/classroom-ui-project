import * as React from 'react';
import { useState, useEffect } from "react";
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
import { InvitePeople } from ".."
import { getAccessToken, getUrlGetPeopleInClass } from '../../services/app.service';
import axios from 'axios';
export default function AlignItemsList({ classData }) {

    const [listStudents, setListStdents] = useState([]);
    const [listTeachers, setListTeachers] = useState([]);
    // const listStudents = [{ name: "Phan Dinh Kha" }, { name: "Nguyen Tien Dat" }, { name: "Tran Bao Nguyen" }];
    // const listTeachers = [{ name: "Phan Dinh Kha" }, { name: "Nguyen Tien Dat" }, { name: "Tran Bao Nguyen" }];
    const { personJoinedClass,
        showInvitePeople, setShowInvitePeople,
        loggedInUser, setPersonJoinedClass,
        settabValue } = useLocalContext();

    const [label, setLabel] = useState("");

    const handleOnclickAddTeacher = () => {
        console.log("AddTeacher");
        setLabel("Invite Teacher");
        setShowInvitePeople(true);
    }
    const handleOnclickAddStudent = () => {
        console.log("AddStudent");
        setLabel("Invite Student");
        setShowInvitePeople(true);
    }

    useEffect(() => {
        if (classData.Role === "student")
            setPersonJoinedClass("Student");
        else
            setPersonJoinedClass("Teacher");

        settabValue("2");
    }, []);

    useEffect(() => {
        console.log('load people');
        const token = getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const url = getUrlGetPeopleInClass(classData.ClassID);
        console.log(config, url);

        axios.get(
            url,
            config
        ).then(res => {
            console.log(res.data);
            // window.location.href = '/';
            const dataUsers = res.data;
            let tempListStudents = [], tempListTeachers = [];
            for (let i in dataUsers) {
                if (dataUsers[i].Role === 'teacher')
                    tempListTeachers.push(dataUsers[i]);
                if (dataUsers[i].Role === 'student')
                    tempListStudents.push(dataUsers[i]);
            }
            setListStdents(tempListStudents);
            setListTeachers(tempListTeachers);
        }).catch(e => {
            console.log(e);
        });
    }, [])

    return (
        <>
            <div className="main">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    subheader={
                        <>
                            <div className="main_list_header_start">
                                <ListSubheader component="div" id="nested-list-subheader" color="primary" >
                                    <p style={{ color: "#1976d2", fontSize: "18px" }}>Teacher</p>
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
                                    primary={item.FullName}
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
                                    <p style={{ color: "#1976d2", fontSize: "18px" }}>Student</p>
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
                                    primary={item.FullName}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    ))}
                </List>
                {showInvitePeople && <InvitePeople Label={label} classID ={classData.ClassID} />}
            </div>
        </>
    );
}