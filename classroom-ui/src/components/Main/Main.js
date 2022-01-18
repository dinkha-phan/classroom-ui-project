import {
    Avatar, Button, TextField, Menu,
    MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useLocalContext } from "../../context/context";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import { getAccessToken, removeAccessToken } from "../../services/app.service";

import "./style.css";
import { green } from "@mui/material/colors";
// import { Announcment } from "..";
const getListGrade = () => {
    return [{ gradeTitle: "CTDL", gradeDetail: "2" }, { gradeTitle: "CTDL", gradeDetail: "3" }, { gradeTitle: "CTDL", gradeDetail: "4" }];
}
const checkBoxValues = [false];
const previousCheckBoxValues = [false];
const Main = ({ classData }) => {
    const { gradeStruct, setGradeStruct } = useLocalContext();

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [showInfo, setshowInfo] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [items, setItems] = useState([]);
    const [showEditCheckBox, setShowEditCheckBox] = useState(false);


    // const []
    const { loggedInUser, setPersonJoinedClass, settabValue } = useLocalContext();
    const handleChange = (e) => {
        setShowInput(false);
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const onCheckBoxChange = (event, data, index) => {
        // data.IsShowed = event.target.checked;
        // console.log(event.target.checked, data);
        checkBoxValues[data.Rank] = event.target.checked;
    }
    const resetCheckValue = () => {
        const newItems = [...items];
        newItems.map((e) => {
            e.IsShowed = previousCheckBoxValues[e.Rank];
        })
        setItems(newItems);
    }
    const onClickEditShowGrade = () => {
        if (showEditCheckBox) {
            resetCheckValue();
        }
        else {
            items.map((e) => {
                console.log(e);
                previousCheckBoxValues[e.Rank] = e.IsShowed || false;
                checkBoxValues[e.Rank] = e.IsShowed || false;
            })
            console.log("previousCheckBoxValues", previousCheckBoxValues);
            console.log("checkBoxValues", checkBoxValues);
        }
        setShowEditCheckBox(!showEditCheckBox)
    }
    const updateGradeStruct = (data) => {
        const { Rank, Grade, ClassID, Name, IsShowed } = data;

        const url = 'http://localhost:3000/grade-struct/class/'
            + ClassID + '/rank/' + String(parseInt(Rank));

        console.log(data);
        console.log(url);
        const token = getAccessToken();
        const config ={
            headers: { Authorization: `Bearer ${token}` }
        }
        const postData = {
            Name: Name,
            Grade: Grade,
            IsShowed: IsShowed,
        }

        axios.put(url, postData, config).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            removeAccessToken(); 
            window.location.href = 'http://localhost:3001/signin';
        });
    }
    const onClickSave = () => {
        console.log("previousCheckBoxValues", previousCheckBoxValues);
        console.log("checkBoxValues", checkBoxValues);
        items.map((e) => {
            if (e.IsShowed !== checkBoxValues[e.Rank]) {
                e.IsShowed = checkBoxValues[e.Rank];
                updateGradeStruct(e);
            }
        })
        setItems(items);
        console.log(items);
        setShowEditCheckBox(!showEditCheckBox);
    }
    const onClickCancel = () => {
        console.log("previousCheckBoxValues", previousCheckBoxValues);
        console.log("checkBoxValues", checkBoxValues);
        resetCheckValue();
        console.log(items);
        setShowEditCheckBox(!showEditCheckBox);
    }
    useEffect(() => {
        if (classData.Role === "student")
            setPersonJoinedClass("Student");
        else setPersonJoinedClass("Teacher");
        settabValue("1");
        const token = getAccessToken();
        const config ={
            headers: { Authorization: `Bearer ${token}` }
        }

        const url = 'http://localhost:3000/grade-struct/class/' + classData.ClassID;
        axios.get(url, config).then((reponse) => {
            console.log(reponse);
            setItems(reponse.data);
            setGradeStruct(reponse.data);
        })
        .catch((error) => {
            console.log(error);
            removeAccessToken(); 
            window.location.href = 'http://localhost:3001/signin';
        });



    }, [])

    return (
        <div className="main">
            <div className="main__wrapper">
                <div className="main__content"
                    style={{ boxShadow: "0px 0px 5px grey" }}
                >
                    <div className="main__wrapper1" style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                        <div className="main__bgImage">
                            <div className="main__emptyStyles" />
                        </div>
                        <div className="main__text">
                            <h1 className="main__heading main__overflow">
                                {classData.className}
                            </h1>
                            <div className="main__section main__overflow">
                                {classData.section}
                            </div>

                            <div className="main__wrapper2">
                                <em className="main__code">{classData.Name}</em>
                                <div className="main__id">Part: {classData.Part}</div>
                                <div className="main__id">Subject: {classData.Title}</div>
                                <div className="main__id">Room: {classData.Room}</div>
                                <div className="main__id">Author: {classData.AuthorName}</div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <IconButton sx={{ color: "white" }} onClick={() => { setshowInfo(!showInfo); }}>
                                {!showInfo ? <InfoOutlinedIcon sx={{ color: "white" }} /> : <InfoRoundedIcon sx={{ color: "white" }} />}
                            </IconButton>
                        </div>

                    </div>
                    {showInfo &&
                        <div style={{ backgroundColor: "#fff" }}>
                            <div style={{ padding: 15 }}>
                                <p style={{ color: "#000", fontSize: 10 }}>
                                    <b>Class code:</b> {classData.ClassID}
                                </p>
                                <p style={{ color: "#000", fontSize: 10 }}>
                                    <b>Subject:</b> {classData.Part}<br></br>
                                </p>
                                <p style={{ color: "#000", fontSize: 10 }}>
                                    <b>Room:</b> {classData.Room}
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <div className="main__announce">
                    <div style={{
                        border: "1.5px solid #dadce0",
                        padding: "15px",
                        borderRadius: "10px",
                        width: "20%",
                        // height: "15vh",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignContent: "flex-start" }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <p style={{ fontSize: 14, display: "inline", margin: 0, padding: 0 }}>Grade Structure</p>
                                {(classData.Role === "teacher") ? (
                                    <IconButton size="small" sx={{ color: "#000" }} onClick={(event) => { setAnchorEl(event.currentTarget) }}>
                                        <MoreVertIcon fontSize="small" sx={{ color: "#000" }} />
                                    </IconButton>)
                                    :
                                    <></>
                                }
                                <Menu

                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'lock-button',
                                        role: 'listbox',
                                    }}
                                    // anchorOrigin={{
                                    //     vertical: 'bottom',
                                    //     horizontal: 'right',
                                    // }}
                                    transformOrigin={{
                                        vertical: 'top',
                                    }}
                                    style={{ marginTop: 40 }}
                                >
                                    <MenuItem onClick={() => { window.location = "/grade-struct/edit/" + classData.ClassID }}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={() => onClickEditShowGrade()}>
                                        Edit show grade for Student
                                    </MenuItem>
                                </Menu>
                            </div>
                            {(items.length > 0) && items.map((e, index) => {
                                return <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <p style={{ fontSize: 15, color: "#2574e2" }}>{e.Name}: {e.Grade}</p>
                                    {showEditCheckBox && <Checkbox defaultChecked={e.IsShowed || false} size="small" onChange={(event) => onCheckBoxChange(event, e, index)} />}
                                </div>;
                            })}
                            {showEditCheckBox &&
                                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10 }}>
                                    <Button variant="contained"
                                        style={{
                                            // backgroundColor: '#1aff1a',
                                            fontSize: 10
                                        }}
                                        color="primary"
                                        onClick={() => onClickSave()}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: '#f6665c',
                                            fontSize: 10,
                                            color: "white"
                                        }}
                                        onClick={() => onClickCancel()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            }


                        </div>


                    </div>
                    <div className="main__announcements">
                        <div className="main__announcementsWrapper">
                            <div className="main__ancContent">
                                {/* {showInput ? (
                                    <div className="main__form">
                                        <TextField
                                            id="filled-multiline-flexible"
                                            multiline
                                            label="Announce Something to class"
                                            variant="filled"
                                            value={inputValue}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <div className="main__buttons">
                                            <input
                                                onChange={handleChange}
                                                variant="outlined"
                                                color="primary"
                                                type="file"
                                            />

                                            <div>
                                                <Button
                                                // onClick={() => setShowInput(false)}
                                                >
                                                    Cancel
                                                </Button>

                                                <Button
                                                    // onClick={handleUpload}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Post
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="main__wrapper100"
                                    // onClick={() => setShowInput(true)}
                                    >
                                        <Avatar />
                                        <div>Announce Something to class</div>
                                    </div>
                                )} */}
                                <div
                                    className="main__wrapper100"
                                // onClick={() => setShowInput(true)}
                                >
                                    <Avatar />
                                    <div>Announce Something to class</div>
                                </div>
                            </div>
                        </div>
                        {/* <Announcment classData={classData} /> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Main;
