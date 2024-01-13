import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { signout } from '../helper/auth';

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      
        signout(() => {
          navigate("/dfggdgdgsfsfsdgsdgsdgdgsdgsdgdfgdfgdf/Login")
        })
    })

  return (
    <div>AdminLogout</div>
  )
}

export default AdminLogout