import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useLocalContext } from "../../context/context";
import "./style.css";
// import { Announcment } from "..";
const Main = ({ classData }) => {
    // const { loggedInMail } = useLocalContext();

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);

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
    }, [])

    return (
        <div className="main">
            <div className="main__wrapper">
                <div className="main__content">
                    <div className="main__wrapper1">
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
                                <div className="main__id">Author: {classData.Auther}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__announce">
                    <div className="main__status">
                        <p>Upcoming</p>
                        <p className="main__subText">No work due</p>
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
        </div>
    );
};

export default Main;
