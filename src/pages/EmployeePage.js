import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
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
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import employeeList from '../_mock/user';
import account from "../_mock/account";
import FormDialog from 'src/components/modal';
import { ADD_EMPLOYEE, GET_EMPLOYEE_DATA } from 'src/database/component/handlers';
import { ACCESS_EMPLOYEE } from 'src/database/component/handlers/Employee';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'department', label: 'Department', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'aadhar', label: 'Aadhar', alignRight: false },
    { id: 'isAccess', label: 'Access Portal', alignRight: false },
    { id: '' },
];

const EMPLOYEE = [
    {
        employeeId: '1',
        employeeName: 'Alice',
        salaryType: 'Fixed Rate',
        // monthlySalary: 15000,
        // hourlyRate: null,
        // diamondRate: null,
        isEmployed: 1,
        department: '4P',
        history: [{ id: 1, date: '', salary: 15000, bonus: 0 }],
        avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    },
    {
        employeeId: '2',
        employeeName: 'Bob',
        salaryType: 'Hourly',
        monthlySalary: null,
        hourlyRate: 20,
        diamondRate: null,
        isEmployed: 1,
        department: '4P',
        history: [{ id: 1, date: '', salary: 15000, bonus: 0 }],
        avatarUrl: `/assets/images/avatars/avatar_1.jpg`,

    },
    {
        employeeId: '3',
        employeeName: 'Charlie',
        salaryType: 'Per Diamond',
        monthlySalary: null,
        hourlyRate: null,
        diamondRate: 0.5,
        isEmployed: 1,
        department: '4P',
        history: [{ id: 1, date: '', salary: 15000, bonus: 0 }],
        avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    },
]

const TEXTFIELDS = [
    { id: "emName", name: "emName", label: "Employee Name", type: "text", isRequired: true },
    { id: "emEmail", name: "emEmail", label: "Employee Email", type: "email", isRequired: true },
    { id: "emPhone", name: "emPhone", label: "Phone Number", type: "number", isRequired: true },
    { id: "emAadhar", name: "emAadhar", label: "Aadhar Number", type: "number", isRequired: false },
]

const DEPARTMENT = [
    { id: 'Other', name: 'Other' },
    { id: '4P', name: '4P' },
    { id: 'Manager', name: 'Manager' },
    { id: 'Sharin', name: 'Sharin' },
    { id: 'Planning', name: 'Planning' },
    { id: 'Ghanti', name: 'Ghanti' },
    { id: 'Galaxy', name: 'Galaxy' },
    { id: 'Office', name: 'Office' },
    { id: 'Soying', name: 'Soying' },
]

const dada = {
    "company": {
        "companyName": "Varni Impex",
        "email": "varniimpex15@gmail.com",
        "isCompany": true,
        "ownerName": "PS Gabani",
        "password": "Varni@123",
        "timestamp": "1710386865001",
        "uid": "ZXQh9fYoDyg5RgmIba5hayGMd272"
    },
    "employee": [
        {
            "emAadhar": "4542654365146",
            "emDepartment": "Manager",
            "emEmail": "gabaniprince1@gmail.com",
            "emName": "Prince",
            "emPhone": "0414842141",
            "emUID": "LMayfwdeBWO1R038h6UX2MJyAHh2",
            "id": "-Nt-KY8m6OrlJEcE7yr3",
            "isAccess": true
        },
        {
            "emAadhar": "321432143214",
            "emDepartment": "Manager",
            "emEmail": "darshan9503@gmail.com",
            "emName": "Darshan",
            "emPhone": "9724803231",
            "emUID": "H1jsH7vomEMR2BOJ0BWzZ24OD3q1",
            "id": "-Nt4hpkkd9wLKIyb3Vcp",
            "isAccess": true
        },
        {
            "emAadhar": "232132131231",
            "emDepartment": "Office",
            "emEmail": "ashok@gmail.com",
            "emName": "AShok",
            "emPhone": "9876543212",
            "id": "-Nt53bOUhzrj5J__6FDI",
            "isAccess": false
        }
    ]
}

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

export default function EmployeePage() {

    const [employeeList, setEmployeeList] = useState([])
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [department, setDepartment] = useState('');
    const [selectIdData, setSelectedIdData] = useState({})
    const [refresh, setRefresh] = useState(false)

    // const fun = () => {
    //     const employee = dada.employee.find((emp) => emp.id === '-Nt53bOUhzrj5J__6FDI');
    //     const emDataRef = dada.employee.forEach(element => {
    //         console.log(element.id == '-Nt53bOUhzrj5J__6FDI')
    //         return element.id == '-Nt53bOUhzrj5J__6FDI'
    //     });

    //     console.log('+++++++++', dada.employee)
    //     console.log('+++++++++', employee)
    // }
    const handleOpenMenu = (event, id, email) => {
        console.log(event.currentTarget)
        setOpen(event.currentTarget);
        setSelectedIdData({ id: id, email: email })
        // console.log('id', id)
    };

    const handleCloseMenu = () => {
        setOpen(null);
        setSelectedIdData({})
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = employeeList.map((n) => n.name);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

    const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const handleClickModal = () => {
        setOpenModal(!openModal);
        console.log("open", openModal)
    };

    const onSubmitAddEmployee = async (e) => {
        console.log('1', e)
        e.preventDefault();
        const formJson = Object.fromEntries((new FormData(e.currentTarget)).entries());

        const data = {
            emName: formJson.emName,
            emEmail: formJson.emEmail,
            emPhone: formJson.emPhone,
            emAadhar: formJson.emAadhar,
            emDepartment: department,
            isAccess: false

        }
        console.log('data to add', data)
        await ADD_EMPLOYEE(data);
        handleClickModal();
        getEmpployeeList()
    }

    const handleMenuItem = async (event, data) => {
        console.log('give access', event, data)
        if (event === 'access') {
            console.log('give portal access')
            await ACCESS_EMPLOYEE({ id: data.id, email: data.email })
            setRefresh(!refresh)
        } else if (event === 'edit') {
            console.log('edit data')
        } else if (event === 'delete') {
            console.log('delete data')
        }
    }

    const getEmpployeeList = async () => {
        console.log('useEffects-1')
        const getData = await GET_EMPLOYEE_DATA();
        console.log('useEffects-2')
        setEmployeeList(getData ?? [])
        console.log('employee data', getData)
    }
    console.log(employeeList)

    useEffect(() => {
        getEmpployeeList()
        // fun()
    }, [refresh])

    return (
        <>
            <Helmet>
                <title> Employee | {account?.companyName} </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Employee
                    </Typography>
                    <Button onClick={() => handleClickModal()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Employee
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={employeeList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                                        const { emName, emEmail, emAadhar, emDepartment, emPhone, isAccess, id } = row;
                                        // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                        console.log('id', id)
                                        const selectedUser = selected.indexOf(emName) !== -1;

                                        return (
                                            <TableRow hover key={key} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, emName)} />
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={emName} src={`/assets/images/avatars/avatar_${key + 1}.jpg`} />
                                                        <Typography variant="button" noWrap>
                                                            {emName}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{emPhone}</TableCell>
                                                <TableCell align="left"><Typography variant="button" noWrap>
                                                    {emDepartment}
                                                </Typography></TableCell>
                                                <TableCell align="left">{emEmail}</TableCell>
                                                <TableCell align="left">{emAadhar}</TableCell>
                                                {/* <TableCell align="left">{isAccess ? 'Yes' : 'No'}</TableCell> */}

                                                <TableCell align="left">
                                                    <Label color={isAccess ? 'success' : 'error'}>{isAccess ? 'YES' : 'NO'}</Label>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, id, emEmail)}>
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
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={employeeList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
                <MenuItem sx={{ color: 'success.main' }} onClick={() => handleMenuItem('access', selectIdData)}>
                    <Iconify icon={'mdi:cloud-access-outline'} sx={{ mr: 2 }} />
                    Give Access
                </MenuItem>

                <MenuItem onClick={() => handleMenuItem('edit', selectIdData)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={() => handleMenuItem('delete', selectIdData)}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>

            </Popover>


            <Dialog
                open={openModal}
                onClose={handleClickModal}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => onSubmitAddEmployee(event)
                }}
            >
                <DialogTitle>Employee Registration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add Employee
                    </DialogContentText>
                    {TEXTFIELDS.map((input, i) => {
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
                    <InputLabel id="demo-simple-select-filled-label">Company Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    >
                        {DEPARTMENT.map((data, i) => {
                            return (<MenuItem key={i} value={data?.name}>{data?.name}</MenuItem>)
                        })}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClickModal()}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>

                {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}> */}
                {/* <InputLabel id="demo-simple-select-filled-label">Company Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    >
                        {DEPARTMENT.map((data, i) => {
                            return (<MenuItem key={i} value={data?.name}>{data?.name}</MenuItem>)
                        })}
                    </Select> */}
                {/* </FormControl> */}
                {/* </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickModal}>Cancel</Button>
                    <Button type='submit'>Save</Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
}