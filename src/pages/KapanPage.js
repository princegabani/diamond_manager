import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

import account from "../_mock/account";
// import { AppWidgetSummary } from 'src/sections/@dashboard/app';

// import { AppWidgetSummary } from '../sections/@dashboard/app'
import KapanCard from '../sections/@dashboard/kapan/kapanCard'
import { ADD_KAPAN, GET_KAPAN_DATA } from 'src/database/component/handlers';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'kapanName', label: 'Kapan Name', alignRight: false },
    { id: 'lotNumber', label: 'Lot Number', alignRight: false },
    { id: 'totalCarat', label: 'Carat', alignRight: false },
    { id: 'buyingDate', label: 'Buying Date', alignRight: false },
    { id: 'amount', label: 'Amount', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
];

const dialogInputs = [
    { id: "kapanName", name: "kapanName", label: "Kapan Name", type: "text" },
    { id: "lotNumber", name: "lotNumber", label: "Lot Number", type: "text" },
    { id: "totalCarat", name: "totalCarat", label: "Total Weight(carat)", type: "number" },
    { id: "buyingDate", name: "buyingDate", label: "Buying Date", type: "date" },
    { id: "amount", name: "amount", label: "Amount($)", type: "number" },
]

const MENU_ITEM = [
    { id: 'split', option: 'split', iconName: 'scissors', }
]
// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function KapanPage() {
    const [KAPANLIST, setKAPANLIST] = useState([])
    const [open, setOpen] = useState(null);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenMenu = (event, id) => {
        setOpen(event.currentTarget);
        console.log(id)
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = KAPANLIST.map((n) => n.kapanName);
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
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const applyFilter = (array, query) => {
        if (query) {
            return array.filter(item =>
                item.kapanName?.toLowerCase().includes(query?.toLowerCase())
            )
        }
        return array
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - KAPANLIST.length) : 0;

    // const filteredKapan = applySortFilter(KAPANLIST, getComparator(order, orderBy), filterName);

    const filteredKapan = applyFilter(KAPANLIST, filterName)

    const isNotFound = !filteredKapan.length && !!filterName;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnClickMenu = (type) => {
        if (type == 'split') {
            console.log('split')
        } else if (type == 'edit') {
            console.log('edit')
        } else {
            console.log('delete')
        }
    }

    const onSubmitAddingKapan = async (e) => {
        e.preventDefault();
        const formJson = Object.fromEntries((new FormData(e.currentTarget)).entries());

        const kapanEntry = {
            // kapanId: filteredKapan.length + 1,
            kapanName: formJson.kapanName,
            lotNumber: formJson.lotNumber,
            totalCarat: formJson.totalCarat ?? '',
            leftCarat: formJson.leftCarat ?? '',
            buyingDate: formJson.buyingDate,// buying days
            amount: formJson.amount,
            kapanStatus: 0, // 0=not_start , 1=running, 2=finish
        }
        // console.log('entry', kapanEntry)
        await ADD_KAPAN(kapanEntry);
        setOpenDialog(false);
        getKapandt()
    }

    const getKapandt = async () => {
        const getKapanData = await GET_KAPAN_DATA();
        setKAPANLIST(getKapanData)
    }

    useEffect(() => {
        getKapandt()
    }, [])

    return (
        <>
            <Helmet>
                <title> Kapan | {account?.companyName} </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Kapan
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenDialog(true)}>
                        New Kapan
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <div style={{ padding: '20px' }}>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <UserListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={KAPANLIST.length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {console.log('filtered kapans', filteredKapan)}
                                        {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                                        {filteredKapan.map((row, i) => {
                                            const { id, kapanId, kapanName, kapanStatus, lotNumber, totalCarat, buyingDate, amount } = row;
                                            const selectedKapan = selected.indexOf(kapanName) !== -1;

                                            return (
                                                <TableRow hover key={i} tabIndex={-1} role="checkbox" selected={selectedKapan}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={selectedKapan} onChange={(event) => handleClick(event, kapanName)} />
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            {/* <Avatar alt={kapanName} src={avatarUrl} /> */}
                                                            <Typography variant="subtitle2" noWrap>
                                                                {kapanName}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">{lotNumber}</TableCell>

                                                    <TableCell align="left">{totalCarat}</TableCell>

                                                    <TableCell align="left">{buyingDate}</TableCell>

                                                    <TableCell align="left">$ {amount}</TableCell>

                                                    <TableCell align="left">
                                                        <Label color={kapanStatus === 0 ? 'error' : kapanStatus === 1 ? 'warning' : 'success'}>{kapanStatus === 0 ? 'Pending' : kapanStatus === 1 ? 'Progress' : 'Ready'}</Label>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, selectedKapan)}>
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    {isNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <Paper
                                                        sx={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography variant="h6" paragraph>
                                                            Not found
                                                        </Typography>

                                                        <Typography variant="body2">
                                                            No results found for &nbsp;
                                                            <strong>&quot;{filterName}&quot;</strong>.
                                                            <br /> Try checking for typos or using complete words.
                                                        </Typography>
                                                    </Paper>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </div>
                    </Scrollbar>

                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={KAPANLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:scissors-fill'} sx={{ mr: 2 }} onClick={() => handleOnClickMenu('split')} />
                    Split
                </MenuItem>
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} onClick={() => handleOnClickMenu('edit')} />
                    Edit
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} onClick={() => handleOnClickMenu('delete')} />
                    Delete
                </MenuItem>
                {/* key={option} selected={option === 'Pyxis'} onClick={handleClose} */}
            </Popover>


            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(!openDialog)}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => onSubmitAddingKapan(event)
                }}
            >
                <DialogTitle>Kapan Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add Kapan
                    </DialogContentText>
                    {dialogInputs.map((input, i) => {
                        return (
                            <TextField
                                key={i}
                                autoFocus
                                required
                                margin="dense"
                                id={input.id}
                                name={input.name}
                                label={input.label}
                                type={input.type}
                                fullWidth
                                variant="standard"
                            />
                        )
                    })}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
