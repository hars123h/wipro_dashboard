import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      
      if(localStorage.getItem('name')===null) {
        navigate('/lull/Login');
      }
        localStorage.clear();
        navigate('/lull/Login');
    })

  return (
    <div>AdminLogout</div>
  )
}

export default AdminLogout