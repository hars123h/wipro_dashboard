import { Typography, Box, TextField, InputAdornment, Button } from '@material-ui/core'
import { Mail, VpnKey } from '@material-ui/icons'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BASE_URL from '../api_url';
import axios from 'axios';
import { authenticate } from '../helper/auth';

const DashboardLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async() => {
        // const data = await axios.post(`${BASE_URL}/admin_login`, {'email':email, 'password':password})
        const data = await axios({
            method: "POST",
            url: `${BASE_URL}/admin_login`,
            data: { email, password },
          })
          .then((response) => {
            console.log("SIGNIN SUCCESS", response);
            // save the response (user, token) localstorage/cookie
            authenticate(response, () => {
              toast.success("Login Successfully!");
               navigate("/dashboard")
              // redirect("/profile");
            });
          })
          .catch((error) => {
            console.log("SIGNIN ERROR", error.response.data.message);
            toast.error(error.response.data.message);
          });

        console.log("Data", data);
        // console.log(data);
        // if(!data.hasOwnProperty('message')) {
        //     localStorage.setItem('_id',data._id);
        //     navigate('/dummyUser/Dashboard');
        // }else {
        //     toast('Invalid Email/Password!');
        // }
    }

    return (
        <Box>
            <Box className="text-white bg-[#1e3a8a] p-4 shadow-lg">
                <Typography variant='h6'>Authentication</Typography>
            </Box>

            <Box className='flex flex-col w-2/6 mx-auto gap-4 mt-36'>
                <TextField onChange={e=>setEmail(e.target.value)} label="Email Address*" variant='outlined' InputProps={
                    {
                        endAdornment:
                            <InputAdornment>
                                <Mail />
                            </InputAdornment>
                    }

                } />
                <TextField onChange={e=>setPassword(e.target.value)} label="Password*" variant='outlined' type="password" InputProps={
                    {
                        endAdornment:
                            <InputAdornment>
                                <VpnKey />
                            </InputAdornment>
                    }

                } />
                <Typography color="textSecondary" className='text-xs mt-4'>Forgot Password?</Typography>
                <Button onClick={handleSubmit} variant="contained" color="primary" className=" w-1/5">Submit</Button>
            </Box>
        </Box>
    )
}

export default DashboardLogin