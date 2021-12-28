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

import "./style.css";
// import { Announcment } from "..";
const getListGrade = () => {
    return [{ gradeTitle: "CTDL", gradeDetail: "2" }, { gradeTitle: "CTDL", gradeDetail: "3" }, { gradeTitle: "CTDL", gradeDetail: "4" }];
}
const Main = ({ classData }) => {
    const { gradeStruct, setGradeStruct } = useLocalContext();

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [showInfo, setshowInfo] = useState(false);
    const [listGrade, setListGrade] = useState([...getListGrade()]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [items, setItems] = useState([]);

    const { loggedInUser, setPersonJoinedClass, settabValue } = useLocalContext();
    const handleChange = (e) => {
        setShowInput(false);
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (classData.Role === "student")
            setPersonJoinedClass("Student");
        else setPersonJoinedClass("Teacher");
        settabValue("1");


        const url = 'http://localhost:3000/grade-struct/class/' + classData.ClassID;
        axios.get(url).then((reponse) => {
            console.log(reponse);
            setItems(reponse.data);
            setGradeStruct(reponse.data);
        })
            .catch((error) => {
                console.log("get Data error", error);
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
                                <div className="main__id">{classData.Part}</div>
                                <div className="main__id">{classData.Tilte}</div>
                                <div className="main__id">{classData.Room}</div>
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
                                    <b>Mã Lớp:</b> {classData.ClassID}
                                </p>
                                <p style={{ color: "#000", fontSize: 10 }}>
                                    <b>Chủ đề:</b> {classData.Part}<br></br>
                                </p>
                                <p style={{ color: "#000", fontSize: 10 }}>
                                    <b>Phòng:</b> {classData.Room}
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
                            <div>
                                <p style={{ fontSize: 14, display: "inline", margin: 0, padding: 0 }}>Grade Structure</p>
                            </div>

                            <div style={{
                                alignItems: "center", display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <IconButton size="small" sx={{ color: "#000" }} onClick={(event) => setAnchorEl(event.currentTarget)}>
                                    <MoreVertIcon fontSize="small" sx={{ color: "#000" }} />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                                >
                                    <MenuItem onClick={() => { window.location = "/grade-struct/edit/" + classData.ClassID }}>
                                        Edit
                                    </MenuItem>
                                </Menu>

                            </div>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            {(items.length > 0) && items.map((e) => {
                                return <p style={{ fontSize: 15, color: "#2574e2" }}>{e.Name}: {e.Grade}</p>;
                            })}
                        </div>
                    </div>
                    <div className="main__announcements">
                        <div className="main__announcementsWrapper">
                            <div className="main__ancContent">
                                {showInput ? (
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
                                )}
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
