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
import { getAccessToken, getUrlGetPeopleInClass, getUrlAddStudentToClass } from '../../services/app.service';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";
import CSVReader from 'react-csv-reader';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function AlignItemsList({ classData }) {

    const [listStudents, setListStdents] = useState([]);
    const [listTeachers, setListTeachers] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [openUpload, setOpenUpload] = useState(false);

    // const listStudents = [{ name: "Phan Dinh Kha" }, { name: "Nguyen Tien Dat" }, { name: "Tran Bao Nguyen" }];
    // const listTeachers = [{ name: "Phan Dinh Kha" }, { name: "Nguyen Tien Dat" }, { name: "Tran Bao Nguyen" }];
    const { personJoinedClass,
        showInvitePeople, setShowInvitePeople,
        loggedInUser, setPersonJoinedClass,
        settabValue } = useLocalContext();

    const [label, setLabel] = useState("");
    const [dataUpload, setDataUpload] = useState([]);

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
    const handleForce = () => {
        const token = getAccessToken();
        const data = dataUpload;
        var tmpCSVData = csvData;
        var tmpListStudents = listStudents;
        for (let i = 0; i < data.length; ++i) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const url = getUrlAddStudentToClass(classData.ClassID, data[i].StudenID);
            console.log(config, url);

            axios.put(
                url,
                config
            ).then((response) => {
                if (response.data === 'Success') {
                    tmpCSVData.push({ StudenID: data[i].StudenID, Fullname: data[i].Fullname });
                    tmpListStudents.push({ StudenID: data[i].StudenID, FullName: data[i].Fullname });
                }
            }).catch((error) => {
                console.log(error);
                window.location.href = 'http://localhost:3001/signin';
            });
        }
        setListStdents(tmpListStudents);
        setCsvData(tmpCSVData);
        console.log(tmpListStudents);
        console.log(tmpCSVData);
    };
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    };
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
            const dataUsers = res.data;
            let tempListStudents = [], tempListTeachers = [], tempCSVdata = [];
            for (let i in dataUsers) {
                if (dataUsers[i].Role === 'teacher')
                    tempListTeachers.push(dataUsers[i]);
                if (dataUsers[i].Role === 'student') {
                    tempListStudents.push(dataUsers[i]);
                    tempCSVdata.push({ StudenID: dataUsers[i].UserID, Fullname: dataUsers[i].FullName });
                }
            }
            console.log(tempListStudents);
            console.log(tempListTeachers);
            setListStdents(tempListStudents);
            setListTeachers(tempListTeachers);
            setCsvData(tempCSVdata);
        }).catch((error) => {
            console.log(error);
            window.location.href = 'http://localhost:3001/signin';
        });
    }, [])


    const handleForce2 = (data, fileInfo) => {
        setDataUpload(data);
    };
    return (
        <>

            {(classData.Role === "teacher") ?
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 30 }}>
                    {/* <CSVReader
                        cssClass="react-csv-input"
                        onFileLoaded={handleForce}
                        parserOptions={papaparseOptions}
                        inputId="ObiWan"
                        inputName="ObiWan"
                        inputStyle={{ color: 'white' }}
                    /> */}
                    <Button variant="contained" size="small" startIcon={<UploadIcon />} onClick={() => { setOpenUpload(true) }} sx={{ mr: 1 }}>
                        Upload
                    </Button>
                    <CSVLink data={csvData} style={{ textDecoration: "none" }} >
                        <Button variant="contained" size="small" startIcon={<DownloadIcon />}>
                            Download
                        </Button>
                    </CSVLink>
                </div> : <> </>
            }
            <>
                <Dialog
                    open={openUpload}
                    onClose={() => { setOpenUpload(false) }}
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                                Upload
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Typography id="modal-modal-description" sx={{ display: "flex", justifyContent: "center" }}>
                            <CSVReader
                                cssClass="react-csv-input"
                                onFileLoaded={handleForce2}
                                parserOptions={papaparseOptions}
                                inputId="ObiWan"
                                inputName="ObiWan"
                            >
                            </CSVReader>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Typography id="modal-modal-description" style={{ margin: "auto 0", display: "flex", width: "100%", justifyContent: "center" }}>
                            <Button variant="contained"
                                startIcon={<UploadIcon />}
                                onClick={handleForce}>
                                Upload
                            </Button>
                        </Typography>
                    </DialogActions>
                </Dialog>
            </>
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
                {showInvitePeople && <InvitePeople Label={label} classID={classData.ClassID} />}
            </div>
        </>
    );
}
