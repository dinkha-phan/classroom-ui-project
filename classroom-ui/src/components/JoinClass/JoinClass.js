import React from 'react'
import { useLocalContext } from '../../context/context'
import { Dialog, Slide, Button, Avatar, TextField } from '@material-ui/core'
import "./style.css"
import { Close } from '@material-ui/icons'
import { useState } from 'react'
import { getAccessToken, getUrlAddUserToClass } from '../../services/app.service'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const JoinClass = () => {
    const { joinClassDialog, setJoinClassDialog, loggedInUser } = useLocalContext();
    const [classCode, setClassCode] = useState("");
    // const [email, setemail] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');



    const handleOnCloseDialog = () => {
        setJoinClassDialog(false);
    }

    const handleSubmit = (e) => {
        //TODO
        // console.log('Email: ', email);
        e.preventDefault();
        console.log('Class Code: ', classCode);
        const token = getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const url = getUrlAddUserToClass(loggedInUser.id);

        const bodyParameters = {
            role: "student",
            classCode: classCode,            
        };

        console.log(config, bodyParameters, url);

        axios.post(
            url,
            bodyParameters,
            config
        ).then(res => {
            console.log(res.data);
            if (res.data.error && res.data.error !== ''){
                setError(true);
                setErrorMsg(res.data.error);
                return;
            }
            if (res.data === true){
                window.location.href='/'
            }
        }).catch(e => {
            console.log(e)
        });  

    }

    return (
        <div>
            <Dialog
                onClose={() => handleOnCloseDialog()}
                fullScreen
                aria-labelledby="customized-dialog-title"
                open={joinClassDialog}
                maxWidth={"xs"}
                className="form__dialog"
                TransitionComponent={Transition}
            >
                <div className='joinClass'>
                    <div className='joinClass__wrapper'>
                        <div
                            className="joinClass__wraper2"
                            onClick={() => setJoinClassDialog(false)}
                        >
                            <Close className="joinClass__svg" />
                            <div className="joinClass__topHead">Join Class</div>
                        </div>
                        <Button
                            className="joinClass__btn"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Join
                        </Button>
                    </div>

                    <div className="joinClass__form">
                        <p className="joinClass__formText">
                            You're currently signed in as {loggedInUser?.FullName}
                        </p>
                        <div className="joinClass__loginInfo">
                            <div className="joinClass__classLeft">
                                <Avatar /* src={loggedInUser?.photoURL}  */ />
                                <div className="joinClass__loginText">
                                    <div className="joinClass__loginName">
                                        {loggedInUser?.FullName}
                                    </div>
                                    <div className="joinClass__loginEmail">
                                        {loggedInUser?.Email}
                                    </div>
                                </div>
                            </div>
                            <Button variant="outlined" color="primary">
                                Logout
                            </Button>
                        </div>
                    </div>

                    <div className="joinClass__form">
                        <div
                            style={{ fontSize: "1.25rem", color: "#3c4043" }}
                            className="joinClass__formText"
                        >
                            Class Code
                        </div>
                        <div
                            style={{ color: "#3c4043", marginTop: "-5px" }}
                            className="joinClass__formText"
                        >
                            Ask your teacher for the class code, then enter it here.
                        </div>
                        <div className="joinClass__loginInfo">
                            <TextField
                                id="outlined-basic"
                                label="Class Code"
                                variant="outlined"
                                value={classCode}
                                onChange={(e) => setClassCode(e.target.value)}
                                error={error}
                                helperText={error && errorMsg}
                            />
                            {/* <TextField
                                id="outlined-basic"
                                label="Owner's email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            /> */}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default JoinClass
