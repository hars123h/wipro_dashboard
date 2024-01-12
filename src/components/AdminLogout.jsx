import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      
      if (localStorage.getItem('_id') !== "65a0e005d1cdbc931cce57f7") {
        navigate('/dfggdgdgsfsfsdgsdgsdgdgsdgsdgdfgdfgdf/Login');
    }
        localStorage.clear();
        navigate('/dfggdgdgsfsfsdgsdgsdgdgsdgsdgdfgdfgdf/Login');
    })

  return (
    <div>AdminLogout</div>
  )
}

export default AdminLogout