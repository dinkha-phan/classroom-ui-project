import React from 'react'
import { useState } from 'react';
import {
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import Input from '@mui/material/Input';

import { useLocalContext } from "../../context/context";
import { getAccessToken, getUrlInvitePeople } from '../../services/app.service';
import axios from 'axios';
const ariaLabel = { 'aria-label': 'description' };

const Form = ({ Label, classID }) => {
    const { showInvitePeople, setShowInvitePeople } = useLocalContext();
    const [emailInvite, setEmailInvite] = useState("");

    const handleClickInvite = (e) => {
        e.preventDefault();
        console.log("############ Invite ###############");
        console.log("email:", emailInvite);

        const token = getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // console.log(Label, classID)
        let role = 'student';
        if (Label === 'Invite Teacher') {
            role = 'teacher';
        }

        const url = getUrlInvitePeople();
        const bodyParameters = {
            role: role,
            classID: classID,
            email: emailInvite
        };

        // {
        //     "classID": "63f11890-4e80-449c-8edc-511dad34124b",
        //     "email": "b@c.com",
        //     "role": "student"
        // }
        console.log(config, bodyParameters, url);

        axios.post(
            url,
            bodyParameters,
            config 
        ).then(res => {
            console.log(res.data);
            setShowInvitePeople(false);

        }).catch(e => {
            console.log(e)
        });
    }

    const handleClickCancel = () => {
        setShowInvitePeople(false);
    }
    return (
        <div className="form">
            <p className="class__title">{Label}</p>

            <div className="form__inputs">
                <Input placeholder="Enter an Email" inputProps={ariaLabel}
                    onChange={(e) => setEmailInvite(e.target.value)}
                />

            </div>
            <DialogActions>
                <Button onClick={handleClickInvite} color="primary">
                    Invite
                </Button>
                <Button onClick={handleClickCancel} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </div>
    )
}

export default Form
