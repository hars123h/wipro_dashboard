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
import { Box, Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AmountContext } from '../App.js';
import axios from 'axios';
import BASE_URL from '../api_url.js';
import referralCodeGenerator from 'referral-code-generator';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';


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

export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const amountDetails = useContext(AmountContext);
    const [adminData, setAdminData] = useState([]);
    const [recSum, setRecSum] = useState(0);
    const [witSum, setWitSum] = useState(0);
    const [balSum, setBalSum] = useState(0);
    const [userCount, setUsersCount] = useState(0);
    const [Reward, SetReward] = useState('')
    const [noOfReward, setNoOfReward] = useState('')
    const [rewardLink, setRewardLink] = useState(localStorage.getItem('rewardLink') ? localStorage.getItem('rewardLink') : '')
    const date = new Date()
    const [withdrawlDate, setWithdrawlDate] = useState(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`)
    const [todaywithdrawl, setTodaywithdrawl] = useState(0)
    const [rechargeDate, setRechargeDate] = useState(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`)
    const [todayRecharge, setTodayRecharge] = useState(0)

    useEffect(() => {
       

        const get_sum_data = async () => {
            await axios.get(`${BASE_URL}/dashboard_data_sum`).then(response => {
                setRecSum(response.data.totalRecharge);
                setWitSum(response.data.totalWithdrawal);
                setBalSum(response.data.totalBalance);
            })
        }

        const get_users_count = async () => {
            await axios.get(`${BASE_URL}/get_user_count`).then(response => {
                setUsersCount(response.data.user_count);
            });
        }
        getData();
        get_sum_data();
        get_users_count();

    }, []);

    const getData = async () => {
        const dataRes = await axios.get(`${BASE_URL}/amounts`).then(({ data }) => {
            // console.log(res);
            setAdminData(data.plan_state);
        });
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(32)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    }

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 32))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }

    // To create a cipher
    const myCipher = cipher('mySecretSalt')

    //To decipher, you need to create a decipher and use it:
    const myDecipher = decipher('mySecretSalt')



    const generatLink = async () => {

        const rewardCode = referralCodeGenerator.alpha('lowercase', 6)

        var code = myCipher(Reward)
        setRewardLink(`https://micro-intels79.site/login?reward=${code}&rewardCode=${rewardCode}`)

        await axios.post(`${BASE_URL}/promocode`, { rewardCode, noOfReward })

    }

    const getcustomWithdrawl = async (date, type) => {

        const { data } = await axios.post(`${BASE_URL}/getFilteredWithdrawl`, { date, type })

        console.log(data);

        if (data.todaywithdrawl.length === 0) {
            if (type === 'widthdrawl') {
                setTodaywithdrawl(0)
            }
            else {
                setTodayRecharge(0)
            }
        }
        else {
            if (type === 'widthdrawl') {
                setTodaywithdrawl(data.todaywithdrawl[0].total)
            }
            else {
                setTodayRecharge(data.todaywithdrawl[0].total)
            }
        }

    }

    useEffect(() => {
        getcustomWithdrawl(withdrawlDate, 'widthdrawl')
    }, [setWithdrawlDate, withdrawlDate])

    useEffect(() => {
        getcustomWithdrawl(rechargeDate, 'recharge')
    }, [setRechargeDate, rechargeDate])



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
                        Dashboard
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

                <div className="">

                    <h1 className='my-5'>Reward Generator</h1>

                    <div className="">

                        <TextField
                            onChange={e => SetReward(e.target.value)}
                            name='reward'
                            label="Enter amount"
                        />
                        <br />
                        <TextField
                            onChange={e => setNoOfReward(e.target.value)}
                            name='reward no.'
                            label="Enter number of rewards"
                        />

                    </div>
                    <br />

                    <Button onClick={generatLink} className='my-5'>Generate</Button>

                    <div className="mb-5">
                        <TextField
                            label="Reward Link"
                            disabled
                            value={rewardLink}
                        />
                    </div>


                    <CopyToClipboard text={rewardLink} onCopy={() => toast('Link copied')}>
                        <Button className='my-5'>
                            Copy Link
                        </Button>
                    </CopyToClipboard>

                </div>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>

                    <Box sx={{ backgroundColor: '#e5e7eb', padding: "20px", borderRadius: '5px', display: 'inline', width: '24%' }} className="shadow-lg">
                        <Box >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-14">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </Box>
                        <Typography >Total Users Count</Typography>
                        <Typography>{userCount}</Typography>
                    </Box>

                    <Box sx={{ backgroundColor: '#e5e7eb', padding: "20px", borderRadius: '5px', display: 'inline', width: '24%' }} className="shadow-lg">
                        <Typography variant="h3">&#8377;</Typography>
                        <Typography >Total Balance Sum</Typography>
                        <Typography  >&#8377; {Math.floor(balSum)}</Typography>
                    </Box>

                    <Box sx={{ backgroundColor: '#e5e7eb', padding: "20px", borderRadius: '5px', display: 'inline', width: '24%' }} className="shadow-lg">
                        <Typography variant="h3">&#8377;</Typography>
                        <Typography >Total Recharge Amount</Typography>
                        <Typography>&#8377; {Math.floor(recSum)}</Typography>
                    </Box>

                    <Box sx={{ backgroundColor: '#e5e7eb', padding: "20px", borderRadius: '5px', display: 'inline', width: '24%' }} className="shadow-lg">
                        <div className="flex items-center justify-between">
                            <Typography variant="h3">&#8377;</Typography>
                            <Input type="date" value={rechargeDate} onChange={e => setRechargeDate(e.target.value)} />
                        </div>
                        <Typography >Today Recharge Amount</Typography>
                        <Typography>&#8377; {Math.floor(Number(todayRecharge))}</Typography>
                    </Box>

                    <Box sx={{ backgroundColor: '#e5e7eb', padding: "20px", borderRadius: '5px', display: 'inline', width: '24%' }} className="shadow-lg">
                        <Typography variant="h3">&#8377;</Typography>
                        <Typography >Total Withdrawal Amount</Typography>
                        <Typography>&#8377; {Math.floor(witSum)}</Typography>
                    </Box>

                    <Box sx={{ backgroundColor: '#e5e7eb', padding: "20px", borderRadius: '5px', display: 'inline', width: '24%' }} className="shadow-lg">
                        <div className="flex items-center justify-between">
                            <Typography variant="h3">&#8377;</Typography>
                            <Input type="date" value={withdrawlDate} onChange={e => setWithdrawlDate(e.target.value)} />
                        </div>
                        <Typography >Today Withdrawal Amount</Typography>
                        <Typography>&#8377; {Math.floor(Number(todaywithdrawl))}</Typography>
                    </Box>

                </Box>

                <Box sx={{ m: 2, p: 2 }} className="rounded-md shadow-xl border border-gray-200">
                    <TableContainer>
                        <Table size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Plan Name</TableCell>
                                    <TableCell>Plan Type</TableCell>
                                    <TableCell>Visibility</TableCell>
                                    <TableCell align="center">Change Visibility</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {adminData && adminData.map((element, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>RTR Plan {index + 1}</TableCell>
                                            <TableCell>{(index + 1) <= 6 ? 'Normal' : 'VIP'}</TableCell>
                                            <TableCell>{element === 1 ? 'Yes' : 'No'}</TableCell>
                                            <TableCell align="center">
                                                <Button color="primary" size='small' variant='contained'
                                                    onClick={async () => {
                                                        var temp = adminData;
                                                        temp[index] = 1 - element;
                                                        await axios.post(`${BASE_URL}/update_plan_state`, {
                                                            new_plan_state: temp
                                                        }).then(() => getData());
                                                    }}>Toggle Visibility</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </main>
        </div>
    );
}
