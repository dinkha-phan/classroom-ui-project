import React from "react";
import { useLocalContext } from "../../context/context";
import {
    Dialog,
    Checkbox,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core";
import './style.css';
import Form from "./Form";

function InvitePeople({Label, classID}) {
    const { showInvitePeople, setShowInvitePeople } = useLocalContext();
    const handleOnCloseDialog = () => {
        setShowInvitePeople(false);
    }

    return (
        <div>
            <Dialog
                onClose={() => handleOnCloseDialog()}
                aria-labelledby="customized-dialog-title"
                open={showInvitePeople}
                maxWidth={showInvitePeople ? "lg" : "xs"}
                className="form__dialog"
            >
                {showInvitePeople ? <Form Label={Label} classID={classID}/>:<></> }
            </Dialog>
        </div>
    )
}

export default InvitePeople