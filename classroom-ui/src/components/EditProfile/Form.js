import React from 'react'
import { useState, useEffect } from 'react';
import {
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import { useLocalContext } from "../../context/context";
import { getAccessToken, getUrlUpdateUser } from '../../services/app.service';
import axios from 'axios';

const Form = () => {
    const { setShowProfile, loggedInUser } = useLocalContext();
    const [email, setEmail] = useState(loggedInUser.email);
    const [userID, setUserID] = useState(loggedInUser.id);
    const [fullName, setFullName] = useState(loggedInUser.fullName);

    const handleClickSave = (e) => {
        e.preventDefault();
        console.log("############ Edit Profile -> Save ###############");

        const token = getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const url = getUrlUpdateUser(loggedInUser.id);

        const bodyParameters = {
            fullName: fullName,
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log(config, bodyParameters, url);

        axios.put(
            url,
            bodyParameters
          
        ).then(res => {
            console.log(res.data);
            window.location.reload();

        }).catch((error) => {
            console.log(error);
            window.location.href = 'http://localhost:3001/signin';
        });
    }

    useEffect(() => {

    }, [])

    const handleClickCancel = () => {
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
                    id="UserID"
                    disabled
                    label="User ID"
                    className="form__input"
                    variant="filled"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <TextField
                    id="FullName"
                    label="Full name"
                    className="form__input"
                    variant="filled"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
