import * as React from 'react';
import useStyles from 'react';
import { useState, useEffect } from "react";
import "./style.css";
import { useLocalContext } from "../../context/context"
// import { getAccessToken, getUrlAddStudentToClass } from '../../services/app.service';
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CsvDownloader from 'react-csv-downloader';
import Button from '@mui/material/Button';
import { getAccessToken, getUrlGetPeopleInClass, getUrlAddStudentToClass, getUrlGetStudentInClass } from '../../services/app.service';
import Modal from '@mui/material/Modal';
import UploadIcon from '@mui/icons-material/Upload';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
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

    const { setPersonJoinedClass, settabValue } = useLocalContext();
    const [listStudents, setListStdents] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [dataTable, setDataTable] = React.useState([]);
    const [dataScore, setdataScore] = React.useState([]);
    const [dataStudent, setdataStudent] = React.useState([]);
    const [rows, setrows] = React.useState([]);
    const [listLabel, setListLabel] = useState(["UserID", "FullName"]);
    const [colSum, setColSum] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([]);
    const [sumChecked, setSumChecked] = React.useState(0);
    const [openUpload, setOpenUpload] = useState(false);
    const [columnUpload, setColumnUpload] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [dataUpload, setDataUpload] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        async function getData() {
            const url = 'http://localhost:3000/gradeClass/class/' + classData.ClassID;
            console.log(url);

            await axios.get(url).then((reponse) => {
                setdataScore(reponse.data);
                console.log("dataScore", url, reponse.data);
            })
                .catch((error) => {
                    console.log("get Data error", error);
                });
            const url2 = getUrlGetStudentInClass(classData.ClassID);
            await axios.get(url2).then((reponse) => {
                setdataStudent(reponse.data);
                console.log("dataStudent", reponse.data);

            })
                .catch((error) => {
                    console.log("get Data error", error);
                });
        }
        getData();

    }, [])

    useEffect(() => {
        dataStudent.map((o) => {
            let check = true;
            console.log('sdasas', dataTable);
            dataTable.map((e) => {
                if (e.UserID === o.UserID) check = false;
            });
            if (check) dataTable.push({ UserID: o.UserID, FullName: o.FullName });
        });
        const newLabel = [...listLabel];
        dataStudent.map((o) => {
            if (!o.Rank) return o;
            while (newLabel.length < o.Rank + 2) newLabel.push("");
            newLabel[o.Rank + 1] = String(o.Name);
        });
        const newdataTable = [...dataTable];
        dataScore.map((o) => {
            newdataTable.map((e) => {
                if (e.UserID === o.UserID) {
                    e[newLabel[o.Rank + 1]] = o.Grade;
                    console.log(e);
                }
            });
        });

        const listSum = [];
        newdataTable.map((row, index) => {
            while (listSum.length < index + 1) listSum.push(0);
            newLabel.map((label, index2) => {

                if (index2 > 1) {
                    if (!newdataTable[index][label]) {
                        console.log("###############################", newdataTable[index]);
                        newdataTable[index][label] = 0;
                    }

                    listSum[index] += newdataTable[index][label];
                }
            })
        })
        console.log("listSum listSum listSum listSum listSum", newdataTable);
        setColSum(listSum);
        setListLabel(newLabel);
        const newChecked = [];
        while (newLabel.length > newChecked.length) newChecked.push(true);
        setChecked(newChecked);
        setrows(newdataTable);
    }, [dataStudent, dataScore]);
    useEffect(() => {
        let sum = 0;
        checked.map((e) => {
            if (e) sum += 1;
            return e;
        });
        console.log("################## sum", sum);
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
        const url = 'http://localhost:3000/gradeClass/user/' + UserID + '/class/' + ClassID + '/rank/' + Rank;
        const postData = {
            grade: Grade,
        }

        axios.put(url, postData).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
        // console.log("StudenId:", row.StudenID);
        // console.log("label:", listLabel[index]);
        // console.log("value", e.value);
        // row[listLabel[index]] = e.value;
        console.log("event:", e);
        console.log(colSum);
        const newColSum = [...colSum];
        newColSum[indexRow] = newColSum[indexRow] - parseInt(e.previousValue) + parseInt(e.value);
        console.log(newColSum);
        setColSum(newColSum);
        // console.log("headIndex:", index);
        // console.log("row:", row);
    }
    const handleForce2 = (data, fileInfo) => {
        setDataUpload(data);
    };
    const handleForce = () => {
        // console.log(data, fileInfo);
        const token = getAccessToken();
        let tmpCSVData = rows;
        let rank =0;
        for(let i =0; i <listLabel.length; ++i){
            if(listLabel[i] === selectedColumn){
                rank = i-1;
                break;
            }
        }
        for (let i = 0; i < dataUpload.length; ++i) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                grade: dataUpload[i]['Grade'],
            };
            const url = 'http://localhost:3000/gradeClass/user/' + dataUpload[i]['StudentID'] + '/class/' + classData.ClassID + '/rank/' + rank;
            console.log(config, url);

            axios.put(
                url,
                config,
            ).then((response) => {
                if (response.data === 'Success') {
                    tmpCSVData[i][selectedColumn] = dataUpload[i]['Grade']; 
                }
            }).catch((error) => {
                console.log(error);
            })
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

    const downloadGrade = ()=>{
        console.log('valueDD',selectedColumn);
        let dataDownload = [];
        for(let i = 0; i <rows.length; ++i){
            let row = {
                StudentID: rows[i]['UserID'],
                Grade: rows[i][selectedColumn]
            }
            dataDownload.push(row);
        }
        return dataDownload;
    }

    const handleChange1 = (event) => {
        const newChecked = checked.map(() => event.target.checked);
        console.log(newChecked);
        setChecked([...newChecked]);
    };

    const handleChange2 = (e, index) => {
        const newChecked = checked.map((e) => e);
        newChecked[index] = e.target.checked;
        setChecked([...newChecked]);
    };


    return (
        <>
            <div style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center", width: "100%",
            }}>

                <div style={{ display: "flex", flexDirection: "row", width: "90%", justifyContent: "space-between", marginBottom: 20 }}>

                    <Button variant="contained" startIcon={<UploadIcon />} onClick={() => { setOpenUpload(true) }}>
                        Upload
                    </Button>
                    <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleOpen}>
                        Download
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                                Download
                            </Typography>

                            <FormControlLabel
                                label="Select all"
                                control={
                                    <Checkbox
                                        checked={sumChecked === checked.length}
                                        indeterminate={sumChecked > 0 && sumChecked < checked.length}
                                        onChange={handleChange1}
                                    />
                                }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3, flexWrap: "wrap" }}>
                                {listLabel.map((label, index) => {
                                    return <FormControlLabel
                                        label={label}
                                        control={<Checkbox checked={checked[index]} onChange={(e) => handleChange2(e, index)} />}
                                    />;
                                })}
                            </Box>
                            <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                                <CSVLink data={csvData} style={{ textDecoration: "none" }}>
                                    <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
                                        Download
                                    </Button>
                                </CSVLink>
                            </Typography>

                        </Box>
                    </Modal>
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
                            <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
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
                            <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                                <Button variant="contained"
                                    startIcon={<UploadIcon />}
                                    onClick={handleForce}>
                                    Upload
                                </Button>
                            </Typography>
                            </DialogActions>
                    
                    </Dialog>
                </div>

                <TableContainer component={Paper} style={{ width: "90%", boxShadow: "0px 1px 5px grey" }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {listLabel.map((value, index) => {
                                    return <TableCell align="center">
                                        {value}

                                        <IconButton size="small" sx={{ color: "#000" }} onClick={(event) => { setAnchorEl(event.currentTarget); setSelectedColumn(value);}}>
                                            <MoreVertIcon fontSize="small" sx={{ color: "#000" }} />
                                        </IconButton>
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
                                            // anchorOrigin={{
                                            //     vertical: 'bottom',
                                            //     horizontal: 'right',
                                            // }}
                                            transformOrigin={{
                                                vertical: 'top',
                                            }}
                                            style={{ marginTop: 40 }}
                                        >
                                            <MenuItem onClick={() => { setOpenUpload(true); setColumnUpload(value) }}>
                                                Import Grade
                                            </MenuItem>
                                            <CSVLink data = {downloadGrade()} filename={"Grade.csv"} 
                                                onClick={() =>{}}
                                            >
                                                <MenuItem>
                                                    Download Grade
                                                </MenuItem>
                                            </CSVLink>
                                            
                                            <MenuItem onClick={() => { }}>
                                                Mark a Grade as public
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>;
                                })}
                                <TableCell align="center">Sum</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, indexRow) => {
                                return <TableRow
                                    sx={{
                                        bgcolor: (indexRow % 2 === 0) ? "#f1f1f1" : "#ffffff",
                                        my: 0,
                                        py: 0,
                                        "&:hover": { bgcolor: "#cccccc" }
                                    }}
                                >
                                    {listLabel.map((value, index) => {
                                        return <TableCell align="center" sx={{
                                            my: 0,
                                            py: 0,
                                        }}>
                                            <div style={{
                                                display: "flex", justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                margin: 0,
                                                padding: 0
                                            }}>
                                                <EditText style={{
                                                    display: "flex",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    paddingTop: 6,
                                                    paddingBottom: 6,
                                                    margin: 0,
                                                    borderWidth: 0,
                                                    width: "100px",
                                                }}
                                                    name={`Edit value row:${indexRow} label:${listLabel[index]} `}
                                                    readonly={index <= 1}
                                                    defaultValue={String(rows[indexRow][value])}
                                                    onSave={(e) => handleSave(e, index, row, indexRow)} />
                                            </div>
                                        </TableCell>;
                                    })}
                                    <TableCell><div style={{
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
