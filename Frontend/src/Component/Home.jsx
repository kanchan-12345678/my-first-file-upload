import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const[data,setData]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:8001/')
    .then(res=>{
      setData(res.data)
    })
    .catch(err=>console.log(err));
  },[])

  const deleteHandler=(id)=>{
    axios.delete(`http://localhost:8001/delete/${id}`)
    .then(res=>{
      location.reload();
    })
    .catch(err=>console.log(err));
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 justify-center items-center p-6'>                                  

      <div className='w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-6'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-700'>
          STUDENTS LIST
        </h1>

        <div className='flex justify-end mb-4'>
          <Link 
            to='/create' 
            className='btn btn-info text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition'
          >
            CREATE+
          </Link>
        </div>

        <div className='overflow-x-auto'>
          <table className='table w-full text-center'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Des</th>
                <th>Hobby</th>
                <th>Image</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {data.map((student,index) =>{
                return (
                  <tr 
                    key={index} 
                    className='hover:bg-gray-100 transition duration-200'
                  >
                    <td className='font-semibold'>{student.id}</td>
                    <td>{student.name}</td>
                    <td className='text-blue-600'>{student.email}</td>
                    <td className='max-w-[150px] truncate'>{student.description}</td>
                    <td>{student.hobby}</td>

                    <td>
                      <img 
                        src={`http://localhost:8001/images/${student.images}`} 
                        alt="student" 
                        className="w-14 h-14 object-cover rounded-full mx-auto border-2 border-indigo-400 shadow"
                      />
                    </td>

                    <td className='flex flex-wrap justify-center gap-2'>
                      <Link 
                        to={`/read/${student.id}`} 
                        className="btn btn-neutral btn-sm"
                      >
                        READ
                      </Link>

                      <Link 
                        to={`/edit/${student.id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        EDIT
                      </Link>

                      <Link 
                        to={`/profile/${student.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Know More
                      </Link>

                      <button 
                        onClick={()=>deleteHandler(student.id)} 
                        className="btn btn-error btn-sm"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Home
