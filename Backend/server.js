
import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { upload } from './middlewere/multer.js'




const app=express();
app.use(cors());
app.use(express.json())
app.use(express.static('public'))
app.use('/images', express.static('public/images'));





const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})








app.get('/', (req,res)=>{
   const sql ="select * FROM student3";
   db.query(sql,(err,result)=>{
    if(err) return res.json("Error");
   })

  db.query(sql,(err,result)=>{
    if(err) return res.json({Message:"Error inside server."});
    return res.json(result);
   })
})

// app.post('/student', async (req, res) => {
  
//         const sql = "INSERT INTO student3 (`name`,`email`,`password`,`description`,`hobby`) VALUES (?)"

//         // 🔐 Hash password
//         // const hashedPassword = await bcrypt.hash(req.body.password, 10)

//         const values = [
//             req.body.name,
//             req.body.email,
//          //   hashedPassword,  // store hashed password
//             req.body.password,
//             req.body.description,
//             req.body.hobby
//         ]


//         db.query(sql, [values], (err, result) => {
//             if (err) return res.json(err)
//             return res.json({ Message: "Student added successfully!" })
//         })

// })

app.post('/student', upload.single('images'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
    }

    const sql = "INSERT INTO student3 (name,email,password,description,hobby,images) VALUES (?,?,?,?,?,?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.description,
        req.body.hobby,
        req.file.filename
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json({ Message: "Student added successfully!" });
    });

});


app.get('/profile/:id', (req,res)=>{
   const sql ="SELECT * FROM student3 WHERE id=?";
   const id=req.params.id;

  db.query(sql,[id],(err,result)=>{
    if(err) return res.json({Message:"Error inside server."});
    return res.json(result);
   })
})

app.get('/read/:id', (req,res)=>{
   const sql ="SELECT * FROM student3 WHERE id=?";
   const id=req.params.id;

  db.query(sql,[id],(err,result)=>{
    if(err) return res.json({Message:"Error inside server."});
    return res.json(result);
   })
})

app.put('/update/:id',(req,res)=>{
    const sql="UPDATE student3 SET `name`=?, `email`=? WHERE id=?";
    const id=req.params.id;
    db.query(sql,[req.body.name,req.body.email,id],(err,result)=>{
        if(err) return res.body.json({Message:"Error inside server."});
        return res.json(result);
    })
})


app.delete('/delete/:id',(req,res)=>{
    const sql="DELETE from student3 WHERE id=?";
     const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.body.json({Message:"Error inside server."});
        return res.json(result);
    })
})

app.listen(8001,()=>{
    console.log("http://localhost:8001")
});