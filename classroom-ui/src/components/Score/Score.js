import * as React from 'react';
import { useState, useEffect } from "react";
import "./style.css";
import { useLocalContext } from "../../context/context"
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";
import CSVReader from 'react-csv-reader';
import { EditText } from 'react-edit-text';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
    getAccessToken, getUrlGetStudentInClass, getUrlGetGradeStructOfClass,
    getUrlGetGradesOfClass,
    getUrlEditGradesOfClass,
    getUrlEditGradeStructOfClass,
    getUrlEditComment,
    getUrlAddOrGetNoti,
    getUrlEditNoti,
    CurrentUrlUI,
    CurrentUrlAPI
} from '../../services/app.service';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { InputBase } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getUrlGetPeopleInClass, removeAccessToken } from '../../services/app.service';

import {
    Menu,
    MenuItem
} from "@material-ui/core";
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Score({ classData }) {

    const { setPersonJoinedClass, settabValue, loggedInUser } = useLocalContext();
    const [csvData, setCsvData] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [dataScore, setdataScore] = useState([]);
    const [dataStudent, setdataStudent] = useState([]);
    const [rows, setrows] = useState([]);
    const [listLabel, setListLabel] = useState(["UserID", "FullName"]);
    const [listIsShow, setListIsShow] = useState([1, 1]);
    const [colSum, setColSum] = useState([]);
    const [checked, setChecked] = useState([]);
    const [sumChecked, setSumChecked] = useState(0);
    const [openUpload, setOpenUpload] = useState(false);
    const [columnUpload, setColumnUpload] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElCell, setAnchorElCell] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [dataUpload, setDataUpload] = useState([]);
    const [gradeSPoint, setGradeSPoint] = useState([]);
    const [sumGSPoint, setSumGSPoint] = useState(0);
    const [rowOver, setRowOver] = useState(0);
    const [columnOver, setColumnOver] = useState(0);
    const [openComment, setOpenComment] = useState(false);
    const [teacherComment, setTeacherComment] = useState("");
    const [studentComment, setStudentComment] = useState("");
    const [commentInfo, setCommentInfo] = useState({});
    const [expectGrade, setExpectGrade] = useState(0);
    const [rowsStatus, setRowsStatus] = useState([]);
    const [listStudents, setListStdents] = useState([]);
    const [listTeachers, setListTeachers] = useState([]);
    const [editUserID, setEditUserID] = useState("");
    const space4 = "    ";
    const space1 = " ";
    const token = getAccessToken();
    const config ={
        headers: { Authorization: `Bearer ${token}` }
    }
    const loadDataScore = async () => {
        const url = getUrlGetGradesOfClass(classData.ClassID);
        console.log(url);

        await axios.get(url, config).then((reponse) => {
            setdataScore(reponse.data);
            console.log("dataScore", url, reponse.data);
        })
        .catch((error) => {
            console.log(error);
            removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
        });
    }
    const loadDataStudent = async () => {
        const url2 = getUrlGetStudentInClass(classData.ClassID);
        await axios.get(url2, config).then((reponse) => {
            setdataStudent(reponse.data);
            console.log("dataStudent", reponse.data);

        })
        .catch((error) => {
            console.log(error);
            removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
        });
    }
    useEffect(() => {
        async function getData() {
            const url3 = getUrlGetGradeStructOfClass(classData.ClassID);
            let titleTmp = [...listLabel];
            let listShow = [...listIsShow];
            let listSPoint = [...gradeSPoint];
            let sums = 0;
            await axios.get(url3, config).then((reponse) => {
                console.log("listLabessss", reponse.data);
                for (let i = 0; i < reponse.data.length; ++i) {
                    titleTmp.push(reponse.data[i]['Name']);
                    listShow.push(reponse.data[i]['IsShowed']);
                    listSPoint.push(reponse.data[i]['Grade']);
                    sums += reponse.data[i]['Grade'];
                }
                setListLabel(titleTmp);
                setListIsShow(listShow);
                setGradeSPoint(listSPoint);
                setSumGSPoint(sums);

            })
            .catch((error) => {
                console.log(error);
                removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
            });
            await loadDataScore();
            await loadDataStudent();
        }
        getData();

    }, [])

    useEffect(() => {
        console.log('load people');
        const url = getUrlGetPeopleInClass(classData.ClassID);
        console.log(config, url);

        axios.get(
            url,
            config
        ).then(res => {
            console.log(res.data);
            const dataUsers = res.data;
            let tempListStudents = [], tempListTeachers = [], tempCSVdata = [];
            for (let i in dataUsers) {
                if (dataUsers[i].Role === 'teacher')
                    tempListTeachers.push(dataUsers[i]);
                if (dataUsers[i].Role === 'student') {
                    tempListStudents.push(dataUsers[i]);
                    tempCSVdata.push({ StudenID: dataUsers[i].UserID, Fullname: dataUsers[i].FullName });
                }
            }
            console.log("#######");
            console.log(tempListStudents);
            setListStdents(tempListStudents);
            setListTeachers(tempListTeachers);
        }).catch((error) => {
            console.log(error);
            removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
        });
    }, [])

    useEffect(() => {
        dataStudent.map((o) => {
            let check = true;
            dataTable.map((e) => {
                if (e.UserID === o.UserID) check = false;
            });
            if (check) dataTable.push({ UserID: o.UserID, FullName: o.FullName });
        });
        const newdataTable = [...dataTable];
        dataScore.map((o) => {
            newdataTable.map((e) => {
                if (e.UserID === o.UserID) {
                    e[listLabel[o.Rank + 1]] = o.Grade;
                }
            });
        });
        const listSum = [];
        newdataTable.map((row, index) => {
            while (listSum.length < index + 1) listSum.push(0);
            listLabel.map((label, index2) => {
                if (index2 > 1) {
                    if (classData.Role === 'teacher') {
                        listSum[index] += (newdataTable[index][label] * gradeSPoint[index2 - 2]) / sumGSPoint;
                    }
                    else if (listIsShow[index2]) {
                        if (!newdataTable[index][label]) newdataTable[index][label] = 0;
                        listSum[index] += (newdataTable[index][label] * gradeSPoint[index2 - 2]) / sumGSPoint;
                    }
                }
            })
        })
        setColSum(listSum);
        const newListShow = [];
        while (newListShow.length < listLabel.length) newListShow.push(0);
        dataStudent.map((e) => {
            listLabel.map((label, index) => {
                if (label === e.Name)
                    newListShow[index] = e.IsShowed;
            });
        });
        setListIsShow(newListShow);
        setrows(newdataTable);
    }, [dataStudent, dataScore]);
    useEffect(() => {

        const newRowsStatus = rows.map((e) => {
            return { ...e };
        });
        dataScore.map((data) => {
            newRowsStatus.map((row) => {
                if (data.UserID === row.UserID) {
                    row[listLabel[data.Rank + 1]] = data.Status || 0;
                }
            })
        })

        console.log("newRowsStatus", newRowsStatus);
        setRowsStatus(newRowsStatus);

    }, [dataScore, rows])
    useEffect(() => {
        const listSum = [];
        rows.map((row, index) => {
            while (listSum.length < index + 1) listSum.push(0);
            listLabel.map((label, index2) => {
                if (index2 > 1) {
                    if (classData.Role === 'teacher') {
                        listSum[index] += (rows[index][label] * gradeSPoint[index2 - 2]) / sumGSPoint;
                    }
                    else if (listIsShow[index2]) {
                        listSum[index] += (rows[index][label] * gradeSPoint[index2 - 2]) / sumGSPoint;
                    }
                }
            })
        })
        setColSum(listSum);

    }, [listLabel, listIsShow, rows]);
    useEffect(() => {
        let sum = 0;
        checked.map((e) => {
            if (e) sum += 1;
            return e;
        });
        setSumChecked(sum);
    }, [checked])
    const handleDownload = () => {
        console.log(rows);
    }
    const handleSave = (e, index, row, indexRow) => {
        const { UserID } = row;
        const ClassID = classData.ClassID;
        const Rank = index - 1;
        const Grade = e.value;
        console.log("post data", Rank, Grade, ClassID, UserID);
        const url = getUrlEditGradesOfClass(ClassID, UserID, Rank);
        const postData = {
            grade: Grade,
        }

        axios.put(url, postData, config).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
        });
        console.log("event:", e);
        console.log(colSum);
        const newColSum = [...colSum];
        newColSum[indexRow] = newColSum[indexRow] + ((parseInt(e.value) - parseInt(e.previousValue)) * gradeSPoint[index - 2] / sumGSPoint);
        console.log(newColSum);
        setColSum(newColSum);
    }
    const handleForce2 = (data, fileInfo) => {
        setDataUpload(data);
    };
    const handleForce = () => {
        // console.log(data, fileInfo);
        const token = getAccessToken();
        let tmpCSVData = rows;
        let rank = 0;
        for (let i = 0; i < listLabel.length; ++i) {
            if (listLabel[i] === selectedColumn) {
                rank = i - 1;
                break;
            }
        }
        for (let i = 0; i < dataUpload.length; ++i) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const postData = {
                grade: dataUpload[i]['Grade']
            }
            const url = getUrlEditGradesOfClass(classData.ClassID, dataUpload[i]['StudentID'], rank);
            console.log(config, url);

            axios.put(
                url,
                postData,
                config,
            ).then((response) => {
                if (response.data === 'Success') {
                    tmpCSVData[i][selectedColumn] = dataUpload[i]['Grade'];
                }
            }).catch((error) => {
                console.log(error);
                removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
            });
        }
        setrows(tmpCSVData);
        setOpenUpload(false);
    };
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    };
    useEffect(() => {
        if (classData.Role === "student")
            setPersonJoinedClass("Student");
        else
            setPersonJoinedClass("Teacher");
        settabValue("3");
    }, []);

    const handleClickAddComment = (index, row, indexRow) => {
        console.log("########### row", row);
        setEditUserID(row.UserID);
        setOpenComment(true);
        setAnchorElCell(null);

        const rank = index - 1;
        console.log("### data score", dataScore);
        console.log("### row", row);
        console.log("### rank", rank);

        dataScore.forEach((e) => {
            if (e.UserID === row.UserID && rank === e.Rank) {
                console.log(e);
                setTeacherComment(e.CommentTC);
                setStudentComment(e.CommentST);
                setExpectGrade(e.ExpectGrade);
                setCommentInfo({
                    UserID: e.UserID,
                    Rank: rank,
                    ClassID: classData.ClassID,
                });
            }
        })
    }

    const markGradeStructAsPublic = async () => {

        const ClassID = classData.ClassID;
        let Rank = 0;
        listLabel.map((e, index) => {
            if (e === selectedColumn) Rank = index - 1;
        })
        const IsShowed = 1;
        // const { Rank, Grade, ClassID, Name, IsShowed } = data;

        const url = getUrlEditGradeStructOfClass(ClassID, String(parseInt(Rank)));

        // console.log(data);
        console.log(url);

        const postData = {
            IsShowed: IsShowed,
        }
        const newListShow = [...listIsShow];
        newListShow[Rank + 1] = 1;
        setListIsShow(newListShow)
        axios.put(url, postData, config).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);
            removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
        });
        console.log("### listStudentslistStudentslistStudents", listStudents);


        const postData2 = {
            content: `${listLabel[Rank + 1]} was made public in class ${classData.Name}`,
            link: `/student/${classData.ClassID}`,
        }

        await listStudents.map(async (data) => {
            const url2 = getUrlAddOrGetNoti(data.UserID);
            await axios.post(url2, postData2, config).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
                removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
            });
        });
    }

    const downloadGrade = () => {
        // console.log('valueDD', selectedColumn);
        let dataDownload = [];
        for (let i = 0; i < rows.length; ++i) {
            let row = {
                StudentID: rows[i]['UserID'],
                Grade: rows[i][selectedColumn]
            }
            dataDownload.push(row);
        }
        return dataDownload;
    }



    const handleSaveComment = async () => {
        setOpenComment(false);
        const { UserID, ClassID, Rank } = commentInfo;
        console.log(commentInfo, teacherComment, studentComment, expectGrade);

        const url = getUrlEditComment(ClassID, UserID, Rank);

        console.log(url);
        const postData = {
            stCmt: studentComment,
            tcCmt: teacherComment,
            exGrade: expectGrade,
            status: (classData.Role === "student") ? 1 : 2,
        }
        await axios.put(url, postData, config).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
        });
        await loadDataScore();

        if (classData.Role === "student") {
            const postData2 = {
                content: `${UserID} want review his grade in class ${classData.Name}`,
                link: `/teacher/${classData.ClassID}`,
            }
            console.log("listTeachers", listTeachers);

            await listTeachers.map(async (data) => {
                const url2 = getUrlAddOrGetNoti(data.UserID);
                console.log("12312312312312312", postData2);
                await axios.post(url2, postData2, config).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                    removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
                });
            });
        }
        else {
            const postData2 = {
                content: `${UserID} responded your grade in class ${classData.Name}`,
                link: `/student/${classData.ClassID}`
            }

            const url2 = getUrlAddOrGetNoti(editUserID);
            console.log("12312312312312312", url2, postData2);
            await axios.post(url2, postData2, config).then((response) => {
                console.log("12312312312312312", response);
            }).catch((error) => {
                console.log(error);
                removeAccessToken(); 
window.location.href = 'http://localhost:3001/signin';
            });

        }

    };

    return (
        <>

            <Dialog
                open={openUpload}
                onClose={() => { setOpenUpload(false) }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                            Upload
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography id="modal-modal-description" sx={{ display: "flex", justifyContent: "center" }}>
                        <CSVReader
                            cssClass="react-csv-input"
                            onFileLoaded={handleForce2}
                            parserOptions={papaparseOptions}
                            inputId="ObiWan"
                            inputName="ObiWan"
                        // cssInputClass="textCSV"
                        >
                        </CSVReader>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Typography id="modal-modal-description" style={{ margin: "auto 0", display: "flex", width: "100%", justifyContent: "center" }}>
                        <Button variant="contained"
                            startIcon={<UploadIcon />}
                            onClick={handleForce}>
                            Upload
                        </Button>
                    </Typography>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openComment}
                onClose={() => { setOpenComment(false) }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Teacher comment
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-multiline-static"
                        label=""
                        multiline
                        InputProps={{
                            readOnly: (classData.Role !== "teacher")
                        }}
                        rows={3}
                        onChange={(event) => { setTeacherComment(event.target.value) }}
                        defaultValue={teacherComment}
                        sx={{ mt: 1, width: "100%" }}
                    />
                </DialogContent>
                <DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Student comment
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-multiline-static"
                        label=""
                        multiline
                        InputProps={{
                            readOnly: (classData.Role !== "student")
                        }}
                        rows={3}
                        onChange={(event) => { setStudentComment(event.target.value) }}
                        defaultValue={studentComment}
                        sx={{ mt: 1, width: "100%" }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Expectation grade"
                        InputProps={{
                            readOnly: (classData.Role !== "student")
                        }}
                        type="number"
                        onChange={(event) => { setExpectGrade(event.target.value) }}
                        defaultValue={expectGrade}
                        sx={{ mt: 1, width: "100%" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Typography id="modal-modal-description" style={{ display: "flex", width: "100%", justifyContent: "space-around", marginBottom: 10 }}>
                        <Button variant="contained"
                            onClick={() => setOpenComment(false)}
                            sx={{ ml: 10, mr: 10 }}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained"
                            onClick={() => handleSaveComment()}
                            sx={{ ml: 10, mr: 10 }}
                        >
                            {space1}Save{space1}
                        </Button>

                    </Typography>
                </DialogActions>
            </Dialog>
            <div style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center", width: "100%",
            }}>

                <div style={{ display: "flex", flexDirection: "row", width: "90%", justifyContent: "flex-end", marginBottom: 20 }}>

                    {
                        (classData.Role === "teacher") ? <>
                            <CSVLink data={rows} style={{ textDecoration: "none" }}>
                                <Button variant="contained" startIcon={<DownloadIcon />}>
                                    Download
                                </Button>
                            </CSVLink>
                        </> : <></>
                    }
                </div>

                <TableContainer component={Paper} style={{ width: "90%", boxShadow: "0px 1px 5px grey", opacity: (rows.length === 0) ? 0 : 1 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {listLabel.map((value, index) => {
                                    return <TableCell align="center">
                                        {value}
                                        {(classData.Role === "teacher") &&
                                            <>
                                                {
                                                    (index > 1) &&
                                                    <IconButton size="small" sx={{ color: "#000" }} onClick={(event) => { setAnchorEl(event.currentTarget); setSelectedColumn(value); }}>
                                                        <MoreVertIcon fontSize="small" sx={{ color: "#000" }} />
                                                    </IconButton>
                                                }
                                                <Menu
                                                    id="simple-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={() => setAnchorEl(null)}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'lock-button',
                                                        role: 'listbox',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                    }}
                                                    style={{ marginTop: 40 }}
                                                >
                                                    <MenuItem onClick={() => { setOpenUpload(true); setColumnUpload(value) }}>
                                                        Import Grade
                                                    </MenuItem>
                                                    <MenuItem >
                                                        <CSVLink data={downloadGrade()} filename={"Grade.csv"}
                                                            onClick={() => { }} style={{ textDecoration: "none", color: "#000000" }}
                                                        >
                                                            Download Grade
                                                        </CSVLink>
                                                    </MenuItem>
                                                    {listLabel.map((value2, index2) => {
                                                        if (selectedColumn === listLabel[index2]) {
                                                            if (listIsShow[index2]) {
                                                                console.log('nham nhi', listIsShow[index]);
                                                                return (
                                                                    <MenuItem disabled onClick={() => markGradeStructAsPublic()}>
                                                                        Mark a Grade as public
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            else {
                                                                console.log('nham nhi2', index);
                                                                return (

                                                                    <MenuItem onClick={() => markGradeStructAsPublic()}>
                                                                        Mark a Grade as public
                                                                    </MenuItem>
                                                                );
                                                            }

                                                        }

                                                    })}
                                                </Menu>
                                            </>
                                        }
                                    </TableCell>;
                                })}
                                <TableCell align="center">Sum</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, indexRow) => {
                                // console.log("row", row, loggedInUser);
                                if (classData.Role === "student" && row.UserID !== String(loggedInUser.id))
                                    return <></>;
                                return <TableRow
                                    sx={{
                                        bgcolor: (indexRow % 2 === 0) ? "#f1f1f1" : "#ffffff",
                                        my: 0,
                                        py: 0,
                                        "&:hover": { bgcolor: "#d9d9d9" }
                                    }}
                                >
                                    {listLabel.map((value, index) => {
                                        return <TableCell align="center" sx={{
                                            my: 0,
                                            py: 0,
                                            bgcolor: (rowsStatus && rowsStatus[indexRow] && rowsStatus[indexRow][value] === 1) ?
                                                "#fff200" : (rowsStatus && rowsStatus[indexRow] && rowsStatus[indexRow][value] === 2) ?
                                                    "#0ed145" : (indexRow % 2 === 0) ? "#f1f1f1" : "#ffffff"
                                            ,
                                            "&:hover": { border: 1.2, borderColor: "#737373" }
                                        }}
                                            onMouseLeave={() => { setColumnOver(-1); setRowOver(-1); }}
                                            onMouseOver={() => { setColumnOver(index); setRowOver(indexRow); }}
                                        >
                                            <div style={{
                                                display: "flex", justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                margin: 0,
                                                padding: 0,
                                            }}>
                                                {(index > 1 && columnOver === index && rowOver === indexRow) && <p>{space4}</p>}
                                                <EditText style={{
                                                    display: "flex",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    paddingTop: 6,
                                                    paddingBottom: 6,
                                                    margin: 0,
                                                    borderWidth: 0,
                                                    maxWidth: (index > 1) ? 50 : 300,
                                                }}
                                                    name={`Edit value row:${indexRow} label:${listLabel[index]} `}
                                                    readonly={index <= 1 || classData.Role === "student"}
                                                    defaultValue={((classData.Role === "student") && (!listIsShow[index]) && (index > 1)) ? "Chưa chấm" : String(rows[indexRow][value])}
                                                    onSave={(e) => handleSave(e, index, row, indexRow)}
                                                    type="number"
                                                />
                                                {/* {index > 1 && value != "Sum" && <div>/100</div>} */}
                                                {
                                                    (index > 1 && columnOver === index && rowOver === indexRow) ?
                                                        <>
                                                            <p>/100</p>
                                                            {
                                                                (index > 1) &&
                                                                <IconButton size="small" sx={{ color: "#000" }} onClick={(event) => { setAnchorElCell(event.currentTarget) }}>
                                                                    <MoreVertIcon fontSize="small" sx={{ color: "#000" }} />
                                                                </IconButton>
                                                            }
                                                            <Menu
                                                                id="simple-menu222"
                                                                anchorEl={anchorElCell}
                                                                keepMounted
                                                                open={Boolean(anchorElCell)}
                                                                onClose={() => setAnchorElCell(null)}
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'lock-button',
                                                                    role: 'listbox',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                }}
                                                                style={{ marginTop: 40 }}
                                                            >
                                                                <MenuItem onClick={() => handleClickAddComment(index, row, indexRow)}>
                                                                    Thêm nhận xét
                                                                </MenuItem>
                                                            </Menu>
                                                        </>
                                                        :
                                                        <>


                                                        </>
                                                }
                                            </div>
                                        </TableCell>;
                                    })}
                                    <TableCell sx={{
                                        my: 0,
                                        py: 0,
                                        "&:hover": { border: 1.2, borderColor: "#737373" }
                                    }}><div style={{
                                        display: "flex", justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        margin: 0,
                                        padding: 0
                                    }}>{colSum[indexRow]}</div></TableCell>
                                </TableRow>;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
