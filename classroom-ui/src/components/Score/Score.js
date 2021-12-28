import * as React from 'react';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';
import DownloadButton from '../../DownloadButton/DownloadButton';
import StudentListImport from '../../ImportFile/StudentListImport/StudentListImport';
import GradeAssignmentImport from '../../ImportFile/GradeAssignmentImport/GradeAssignmentImport';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
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
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


/*<DownloadButton purpose='grade_assignment'/>
  <GradeAssignmentImport setStudents={setStudents} students_ids={students.map(student=>student.id_uni)} id_class={idclass} id_assignment={4}/>*/

function createData(listStudent) {
    let listtemp = []
    //let example = listStudent.assignmentGrade;
    //console.log("list Student duoc truyen vao trong createData nè: ", example);
    for (let i = 0; i < listStudent.length; i++) {
        let tempStu = {};
        tempStu.name = listStudent[i].username;
        tempStu.listGrade = [];
        for (let j = 0; j < listStudent[i].assignmentGrade.length; j++) {
            tempStu.listGrade.push(listStudent[i].assignmentGrade[j].gradeAssignment)
        }
        listtemp.push(tempStu);
    }
    return listtemp;
}


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'thuyettrinh',
        numeric: true,
        disablePadding: false,
        label: 'Thuyết trình',
    },
    {
        id: 'baitap',
        numeric: true,
        disablePadding: false,
        label: 'Bài tập',
    },
    {
        id: 'giuaky',
        numeric: true,
        disablePadding: false,
        label: 'Giữa kỳ',
    },
    {
        id: 'cuoiky',
        numeric: true,
        disablePadding: false,
        label: 'Cuối kỳ',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, listHeader } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    console.log("List Header: ", listHeader);

    let headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Tên học sinh',
        },
    ];
    listHeader.map((item) => {
        let temp = {};
        temp.id = item.name;
        temp.numeric = false;
        temp.disablePadding = true;
        temp.label = item.name;
        temp.pointStructure = item.point + ' điểm';
        headCells.push(temp);
    });
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            <br />
                            {headCell.pointStructure}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    listHeader: PropTypes.array.isRequired,
};



const EnhancedTableToolbar = (props) => {
    const { numSelected, selected, classname } = props;
    const handleClickEdit = (event, a) => {
        //const a = selected;
        console.log("@@@@@@", a)
        //alert(a)
    };
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} học viên được chọn
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Lớp {classname}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Chỉnh sửa">
                    <IconButton >
                        <EditIcon onClick={(event) => handleClickEdit(event, selected)} />
                    </IconButton>
                </Tooltip>
            ) : (
                <div style={{ position: "absolute", right: "5px" }} >
                    <Tooltip title="Download">
                        <IconButton>
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Upload">
                        <IconButton>
                            <FileUploadIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function Scores({ idclass, isTeacher, class_name, grade_board }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [gradeboard, setGradeBoard] = React.useState(grade_board);
    const rows = createData(gradeboard.listStudentGrade);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    console.log(rows);
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} classname={class_name} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >

                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            listHeader={grade_board.listAssignment}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    let listTableCell = [];
                                    let squareDiv = [];
                                    console.log("row ne: ", row.listGrade);
                                    listTableCell.push(<TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.name}
                                    </TableCell>);
                                    for (let i = 0; i < row.listGrade.length; i++) {
                                        let point = row.listGrade[i];
                                        listTableCell.push(<TableCell align="left">{point}</TableCell>);
                                    }
                                    console.log("List table cell: ", listTableCell);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {listTableCell}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination

                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </Box>
    );
}
