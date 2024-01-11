import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { collection, getDocs, doc, updateDoc, increment, orderBy, query } from 'firebase/firestore';
import db from '../firebase/config.js'
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import useInterval from '../hooks/useInterval.js';
import { CheckCircle, Close, Search } from '@material-ui/icons';
import axios from 'axios';
import BASE_URL from '../api_url';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Withdrawals() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();
    const [withdrawal_list, setwithdrawal_list] = useState(null);
    const [is_loading, setIs_loading] = useState(false);
    const [searchField, setSearchField] = useState('');

    const getWithdrawals_list = async () => {

        setwithdrawal_list([])

        const docSnap = await axios.get(`${BASE_URL}/get_all_withdrawals`).then(res => res.data);
        //console.log(docSnap);
        // var temp_Data = [];
        // docSnap.data.forEach((doc) => {
        //     if (doc.status === status) {
        //         temp_Data = [{ ...doc, 'withdrawal_id': doc._id }, ...temp_Data];
        //     }
        // }
        // );
        // console.log(docSnap.data);
        setwithdrawal_list(docSnap.data?.filter(e => e.status === status));
    }

    const getUsers_cstm = async () => {
        if (searchField.length === 0) {
            getWithdrawals_list();
            return;
        }
        setwithdrawal_list([])
        const filtered = await axios.post(`${BASE_URL}/getcustomewithdrawl`, { searchField: searchField }).then(res => res.data);
        //console.log(docSnap);
        // var temp_Data = [];
        // filtered.data.forEach((doc) => {
        //     if (doc.status === status) {
        //         temp_Data = [{ ...doc, 'withdrawal_id': doc._id }, ...temp_Data];
        //     }
        // }
        // );
        //console.log(docSnap);
        // console.log(filtered);
        setwithdrawal_list(filtered.data?.filter(e => e.status === status));

    }

    // This is the rate at which the polling is done to update and get the new Data

    // if (searchField.length === 0) {
    useInterval(getWithdrawals_list, 6000 * 10 * 2);
    // }
    // else {
    //     useInterval(getUsers_cstm, 6000);
    // }

    useEffect(() => {
        if (localStorage.getItem('name') === null) {
            navigate('/lull/Login');
        }
        getWithdrawals_list();
    }, []);

    const updateStatus = async (withdrawal_id, new_status, withdrawal_value, user_id) => {

        await axios.post(`${BASE_URL}/update_withdrawal_status`, {
            withdrawal_id, new_status, withdrawal_value, user_id
        })
            .then(() => getWithdrawals_list())
            .catch((error) => console.log('Some error occured!'));
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setStatus(e.target.value);
        // getUsers_cstm()
    }

    useEffect(() => {
        getUsers_cstm();
    }, [searchField]);

    useEffect(() => {
        // getWithdrawals_list();
        getUsers_cstm();
    }, [status, setStatus])


    // console.log(status, withdrawal_list);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Withdrawals
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: '1', justifyContent: 'end' }}>
                        <Typography variant="div" sx={{ fontSize: '10px' }}>Automatic</Typography>
                        <Switch />
                        <Typography variant='div' sx={{ fontSize: '10px' }}>Manual</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography>RTR Dashboard</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard', 'Withdrawals', 'Amount Setup', 'User', 'Transactions', 'Access', 'Feedback', 'Logout'].map((text, index) => (
                        <Link to={`/dummyUser/${text}`}>
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Box>
                    <TextField
                        placeholder='Search'
                        variant='outlined'
                        fullWidth
                        onChange={e => setSearchField(e.target.value)}
                        InputProps={
                            {
                                endAdornment:
                                    <InputAdornment>
                                        <Search />
                                    </InputAdornment>
                            }

                        }
                    />
                </Box>
                <div className='mb-2'>
                    <FormControl variant="filled" sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={'pending'}>Pending</MenuItem>
                            <MenuItem value={'confirmed'}>Confirmed</MenuItem>
                            <MenuItem value={'declined'}>Declined</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Amount after Deduction</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Account Number</TableCell>
                                    <TableCell align="right">IFSC Code</TableCell>
                                    <TableCell align="right">Bank Name</TableCell>
                                    {status === 'pending' && <TableCell align="right">Action</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {withdrawal_list && withdrawal_list.map((element, id) => (
                                    <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="right">{element.phoneNo}</TableCell>
                                        <TableCell align='right'>&#8377;{element.withdrawalAmount}</TableCell>
                                        <TableCell align='right'>&#8377;{element?.afterDeduction ? element.afterDeduction : 0}</TableCell>
                                        <TableCell align="right">{element.fullName}</TableCell>
                                        <TableCell align="right">{element.bankAccount}</TableCell>
                                        <TableCell align="right">{element.ifsc}</TableCell>
                                        <TableCell align="right">{element.bankName}</TableCell>
                                        {(element.status === 'pending') && <TableCell align='right'>
                                            <IconButton onClick={() => updateStatus(element._id, 'confirmed', element.withdrawalAmount, element.user_id)}>
                                                <CheckCircle color='primary' />
                                            </IconButton>
                                            <IconButton onClick={() => updateStatus(element._id, 'declined', element.withdrawalAmount, element.user_id)}>
                                                <Close />
                                            </IconButton>
                                        </TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </main>
        </div>
    );
}
