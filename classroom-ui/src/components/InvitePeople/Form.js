import React from 'react'
import { useState } from 'react';
import {
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import Input from '@mui/material/Input';

import { useLocalContext } from "../../context/context";
const ariaLabel = { 'aria-label': 'description' };

const Form = ({Label}) => {
    const { showInvitePeople, setShowInvitePeople } = useLocalContext();
    const [emailInvite, setEmailInvite] = useState("");   
    const handleClickInvite = (e) => {
        e.preventDefault();
        console.log("############ Invite ###############");
        console.log("email:",emailInvite);
    }
    const handleClickCancel = () =>{
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
