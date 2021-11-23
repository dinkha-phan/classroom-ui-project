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

function EditProfile() {
    const { showProfile, setShowProfile } = useLocalContext();
    const handleOnCloseDialog = () => {
        setShowProfile(false);
    }

    return (
        <div>
            <Dialog
                onClose={() => handleOnCloseDialog()}
                aria-labelledby="customized-dialog-title"
                open={showProfile}
                maxWidth={showProfile ? "lg" : "xs"}
                className="form__dialog"
            >
                {showProfile ? <Form />:<></> }
            </Dialog>
        </div>
    )
}

export default EditProfile