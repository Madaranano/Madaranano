const express = require('express')
const app = express()
const port = 3001

const Artical = require("./models/Articale");

const mongoose =require('mongoose')
mongoose.connect("mongodb+srv://p:p@cluster0.qblhkux.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("connect")
}).catch(()=>{
  console.log("error")
});
app.get('/', (req, res) => {
  res.send('Wlcod')
})
app.get("/hi",(req,res)=>{
  // link is http://localhost:3001/hi?age=30
  res.send(req.query)
  // result: {
  //   "age": "30"
  //   }
  
})


app.get("/json",(req,res)=>{
  res.json({
    name: "bilal",
    age:req.query.age
  })
})

// : MEAN A PARAMETER
app.get("/h/:NUM",(req,res)=>{
  // params is get parameter in link 
  console.log(req.params)

  //json parameter in the body console.log(req.body)
  const num =req.params.NUM
  res.send(`the number are : ${num}`)
})



app.get('/num',(req,res)=>{
  let num =""
  for(let i=0;i<=100;i++){
    num +=i +"-";
  }
  const n=6;
  // res.sendFile(__dirname + "/views/num.html")
  // it thing u have folder name view
  res.render("num.ejs",{
    name:"khalil",
    num:num,
  });
  // res.send(`this is the num ${num}`)
})

//======Articals endpoints=====
app.post("/art",async(req,res)=>{
  const newArtical= new Artical()

  // const artTitle=req.body.articalTitle;
  // const artBody=req.body.articalBody;

  // newArtical.title=artTitle;
  // newArtical.body=artBody;
  newArtical.title="vision pro"
  newArtical.body="this is body"
  await newArtical.save()

  res.send("artical add")
});


//Fiend all art
app.get("/art",async (req,res)=>{
  
  const art =await Artical.find()
  res.status(200).json(art)
})

//Fiend by id 


app.get("/art/:artId",async (req,res)=>{
  const id = req.params.artId
  try{
    const art =await Artical.findById(id)
    res.status(200).json(art)
    return;
  }catch(error){
    console.log("error")
    return;
  }
})
app.delete("/art/:artId",async (req,res)=>{
  const id = req.params.artId
  try{
    const art =await Artical.findByIdAndDelete(id)
    res.status(200).send("delete complete")
    return;
  }catch(error){
    console.log("error")
    return;
  }
})

// npx nodemon app.js
app.listen(port, () => {
  console.log(`App listening on port :  ${port}`)
})