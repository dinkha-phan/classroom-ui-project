import React from 'react'
import { useState } from 'react';
import {
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';

import { getAccessToken, getUrlCreateClasseForUser, removeAccessToken } from '../../services/app.service';
import { useLocalContext } from '../../context/context';
import axios from 'axios';


const Form = () => {
    const [className, setClassName] = useState("");
    const [Section, setSection] = useState("");
    const [Room, setRoom] = useState("");
    const [Subject, setSubject] = useState("");

    const { loggedInUser } = useLocalContext();
    const addClass = (e) => {
        e.preventDefault();
        const token = getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const url = getUrlCreateClasseForUser(loggedInUser.id);

        const bodyParameters = {
            role: "teacher",
            name: className,
            part: Section,
            title: Subject,
            room: Room
        };

        console.log(config, bodyParameters, url);

        axios.post(
            url,
            bodyParameters,
            config
        ).then(res => {
            console.log(res.data);
            if (res.data.msg === 'success'){
                window.location.href='/'
            }
        }).catch((error) => {
            console.log(error);
            removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
        });


        // https://github.com/kimlimjustin/Classroom/blob/master/client/src/Components/login.component.js
    }
    return (
        <div className="form">
            <p className="class__title">Create Class</p>

            <div className="form__inputs">
                <TextField
                    id="filled-basic"
                    label="Class Name (required)"
                    className="form__input"
                    variant="filled"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="Section"
                    className="form__input"
                    variant="filled"
                    value={Section}
                    onChange={(e) => setSection(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="Subject"
                    className="form__input"
                    variant="filled"
                    value={Subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="Room"
                    className="form__input"
                    variant="filled"
                    value={Room}
                    onChange={(e) => setRoom(e.target.value)}
                />
            </div>
            <DialogActions>
                <Button onClick={addClass} color="primary">
                    Create
                </Button>
            </DialogActions>
        </div>
    )
}

export default Form
