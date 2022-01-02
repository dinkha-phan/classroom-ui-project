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
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import { getAccessToken, getUrlGetPeopleInClass, getUrlAddStudentToClass, getUrlGetStudentInClass } from '../../services/app.service';
import { InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import { InputBase } from '@mui/material';

// function createData(name, calories, fat, carbs, protein) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//     };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),



const getlistLabel = () => {
    const examplelistLabel = ["UserID", "FullName", "CTDL", "Web", "Mobile"];
    return examplelistLabel;
}


export default function Score({ classData }) {

    const { setPersonJoinedClass, settabValue } = useLocalContext();
    const [listStudents, setListStdents] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dataTable, setDataTable] = React.useState([]);
    const [dataScore, setdataScore] = React.useState([]);
    const [dataStudent, setdataStudent] = React.useState([]);
    const [rows, setrows] = React.useState([]);
    const [listLabel, setListLabel] = useState(["UserID", "FullName"]);
    const [rankToLabel, setRankToLabel] = useState([""]);

    const TextInput = props => {
        const { onChange, type } = props;
        const classes = useStyles();

        return (
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                disableUnderline={false}
                // label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                autoFocus
                classes={{ notchedOutline: classes.input }}

                // onChange={handlePhoneNumberChange}
                className={classes.textField}
                placeholder="Phone Number"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleIcon />
                        </InputAdornment>
                    ),
                    classes: { notchedOutline: classes.noBorder }
                }}
            />
        );
    };

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
            console.log('sdasas',dataTable);
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
        setListLabel(newLabel);
        console.log('datass',newdataTable);
        setrows(newdataTable);
    }, [dataStudent, dataScore]);

    const getScoreBoard = () => {
        const exampleData = [
            {
                StudenID: "18120116",
                FullName: "Đạt",
                CTDL: "8",
                Web: "9",
                Mobile: "8",
            }
            ,
            {
                StudenID: "18120141",
                FullName: "Nguyên",
                CTDL: "9",
                Web: "9",
                Mobile: "9",
            }
        ];
        return [...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData, ...exampleData,];
    }
    // const rows = getScoreBoard();


    const handleChange = (e, index, row) => {
        row[listLabel[index]] = e;
        console.log("chaekjablksjbdfalkjfaskljhf", e, index, row);
        // console.log("StudenId:", row.StudenID);
        // console.log("label:", listLabel[index]);
        // console.log("value", e.value);
        // row[listLabel[index]] = e.value;
        // console.log("event:", e);
        // console.log("headIndex:", index);
        // console.log("row:", row);
    }
    const handleSave = (e, index, row) => {
        console.log("StudenId:", row.StudenID);
        console.log("label:", listLabel[index]);
        console.log("value", e.value);
        row[listLabel[index]] = e.value;
        console.log("event:", e);
        console.log("headIndex:", index);
        console.log("row:", row);
    }
    const handleForce = (data, fileInfo) => {
        // console.log(data, fileInfo);
        const token = getAccessToken();
        var tmpCSVData = csvData;
        var tmpListStudents = listStudents;
        for (let i = 0; i < data.length; ++i) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const url = getUrlAddStudentToClass(classData.ClassID, data[i].StudenID);
            console.log(config, url);

            axios.put(
                url,
                config
            ).then((response) => {
                if (response.data === 'Success') {
                    tmpCSVData.push({ StudenID: data[i].StudenID, Fullname: data[i].Fullname });
                    tmpListStudents.push({ StudenID: data[i].StudenID, FullName: data[i].Fullname });
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        setListStdents(tmpListStudents);
        setCsvData(tmpCSVData);
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



    return (
        <>

            <div style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center", width: "100%",
            }}>

                <div style={{ display: "flex", flexDirection: "row", width: "90%", justifyContent: "space-between", marginBottom: 20 }}>
                    <CSVReader
                        cssClass="react-csv-input"
                        onFileLoaded={handleForce}
                        parserOptions={papaparseOptions}
                        inputId="ObiWan"
                        inputName="ObiWan"
                    // cssInputClass="textCSV"
                    >

                    </CSVReader>
                    <CSVLink data={csvData} style={{ textDecoration: "none" }}>
                        <Button variant="contained" startIcon={<DownloadIcon />}>
                            Download
                        </Button>
                    </CSVLink>
                </div>

                <TableContainer component={Paper} style={{ width: "90%", boxShadow: "0px 1px 5px grey" }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {listLabel.map((value, index) => {
                                    return <TableCell align="center">{value}</TableCell>;
                                })}
                                {/* <TableCell>StudentID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, indexRow) => {
                                // console.log("render row", row);
                                return <TableRow
                                    // key={row.StudenID}
                                    // key={indexRow}
                                    sx={{

                                        // '&:last-child td, &:last-child th': { border: 10 },
                                        bgcolor: (indexRow % 2 === 0) ? "#f1f1f1" : "#ffffff",
                                        my: 0,
                                        py: 0,
                                        "&:hover": { bgcolor: "#cccccc" }
                                    }}
                                >
                                    {listLabel.map((value, index) => {
                                        // console.log("render value", row, value, row[value]);
                                        return <TableCell align="center" sx={{
                                            // '&:last-child td, &:last-child th': { border: 10 },
                                            // bgcolor: (indexRow % 2 === 0) ? "#f1f1f1" : "#ffffff",
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
                                                {/* <EditText style={{
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
                                                    defaultValue={rows[indexRow][value] || ""}
                                                    onChange={(e) => handleChange(e, index, row)}
                                                    onSave={(e) => handleSave(e, index, row)} /> */}

                                                <InputBase
                                                    defaultValue={rows[indexRow][value] || ""}
                                                />

                                            </div>
                                        </TableCell>;
                                    })}
                                    {/* <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
                                </TableRow>;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
