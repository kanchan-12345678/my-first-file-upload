import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [values,setValues]=useState({
        name:"",
        email:"",
        password: "",
        description : "",
        hobby: ""
    })

    const [image, setImage] = useState(null);   // ✅ added

    const navigate=useNavigate();

    const submitHandler=(e)=>{
        e.preventDefault();

        const formData = new FormData();   // ✅ added

        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("description", values.description);
        formData.append("hobby", values.hobby);
        formData.append("images", image);  // ✅ must match backend upload.single('images')

        axios.post('http://localhost:8001/student', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res=>{
            console.log(res);
            navigate('/');
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className='flex h-[100vh] bg-amber-600 justify-center items-center'>

      <div className='w-[700px] bg-amber-50 rounded-2xl p-4'>

        <form onSubmit={submitHandler}>
            <h1>Add Students</h1>

            <div className='mb-2'>
                <label>Name</label>
               <input type="text" placeholder="Success" className="input input-success w-full" 
               onChange={e=>setValues({...values,name: e.target.value})}
               required
               />
            </div>

             <div className='mb-2'>
                <label>Email</label>
                <input type="email" placeholder="Warning" className="input input-warning w-full" 
                onChange={e=>setValues({...values,email: e.target.value})}
                required
                />
            </div>

            <div className='mb-2'>
                <label>Password</label>
                <input 
                  type="password"
                   placeholder="enter your password" 
                   className="input input-warning w-full" 
                onChange={e=>setValues({...values,password: e.target.value})}
                required
                />
            </div>

            <div className='mb-2'>
                <label>Description</label>
                <input type="text" className="input input-warning w-full" 
                onChange={e=>setValues({...values,description: e.target.value})}
                required
                />
            </div>

              <div className='mb-2'>
                <label>Hobby</label>
                <input type="text" className="input input-warning w-full" 
                onChange={e=>setValues({...values,hobby: e.target.value})}
                />
            </div>

            {/* ✅ Image Input Added */}
            <div className='mb-2'>
                <label>Image</label>
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full"
                    onChange={e => setImage(e.target.files[0])}
                    required
                />
            </div>

            <button className='btn btn-secondary m-2'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}

export default Create;
