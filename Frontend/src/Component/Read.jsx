import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Read = () => {
    const {id}=useParams();
    const [student,setStudent]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8001/read/'+id)
        .then(res=>{
            console.log(res);
            setStudent(res.data[0]);
    })
        .catch(err=>console.log(err));

    },[])
  return (
    <div className='flex h-[100vh] bg-amber-600 justify-center items-center'>
      <div className='w-[700px] bg-amber-50 rounded-2xl p-4'>
        <h1>STUDENTS DETAIL</h1>
        <h1>{student.id}</h1>
        <h1>{student.name}</h1>
        <h1>{student.email}</h1>
        <h1>{student.password}</h1>
        <h1>{student.descriptio}</h1>
        <h1>{student.hobby}</h1>
        <Link to='/' className='btn btn-primary m-2'>BACK</Link>
        <Link to={`/edit/${student.id}`} className='btn btn-secondary m-2'>EDIT</Link>
      </div>
    </div>
  )
}

export default Read