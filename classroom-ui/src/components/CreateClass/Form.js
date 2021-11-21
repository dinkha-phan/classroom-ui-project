import React from 'react'
import { useState } from 'react';
import {
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';


const Form = () => {
    const [className, setClassName] = useState("");
    const [Section, setSection] = useState("");
    const [Room, setRoom] = useState("");
    const [Subject, setSubject] = useState("");
    const addClass = (e) => {
        e.preventDefault();
        console.log(className);
        console.log(Section);
        console.log(Room);
        console.log(Subject);

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
