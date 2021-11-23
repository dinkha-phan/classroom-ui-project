import React from 'react'
import { useState } from 'react';
import {
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import { useLocalContext } from "../../context/context";

const Form = () => {
    const { setShowProfile,loggedInUser } = useLocalContext();
    const [email, setEmail] = useState(loggedInUser.email);
    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const handleClickSave = (e) => {
        e.preventDefault();
        console.log("############ Edit Profile -> Save ###############");
        console.log("id:",loggedInUser.id);
        console.log("email:",email);
        console.log("fullName:",fullName);
        console.log("dateOfBirth:",dateOfBirth);
    }
    const handleClickCancel = () =>{
        setShowProfile(false);
    }
    return (
        <div className="form">
            <p className="class__title">Edit Profile</p>

            <div className="form__inputs">
                <TextField
                    id="Email"
                    label="Email"
                    className="form__input"
                    variant="filled"
                    disabled
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="FullName"
                    label="Full name"
                    className="form__input"
                    variant="filled"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    id="DateOfBirth"
                    label="Date of birth"
                    className="form__input"
                    variant="filled"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <DialogActions>
                <Button onClick={handleClickSave} color="primary">
                    Save
                </Button>
                <Button onClick={handleClickCancel} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </div>
    )
}

export default Form
