//import express package  and store into a variable
const express=require("express")

//import backendservice file
const bs=require('./service/backendService')

//import cors
const cors=require("cors")

//app creation

const app=express()
//to convert all the data json to js automatically
app.use(express.json())

//integrate fontend with app
app.use(cors({origin:"http://localhost:4200"}))

const jwt=require("jsonwebtoken")

//register  post
//login get
//deposit  patch
//withdrawl  patch
//transaction  get
// delete     delete

//middleware creation

const jwtMiddleWare=(req,res,next)=>{
  try{
    //access data from request
  const token1=req.headers['access_data']
  //verify the token with sedret key
  const data=jwt.verify(token1,"tokenkey123")
  next()
}
catch{
  res.status(405).json(
    {
      status:false,
      message:"please login",
      statusCode:405
    }
  )
}

}

app.post("/register",(req,res)=>{
   bs.register(req.body.accno,req.body.uname,req.body.pass).then(result=>{
    if(result)
    {
      res.status(result.statusCode).json(result)
      // console.log(bs.userDetails);
    }
    else{
      res.status(result.statusCode).json(result)
    }
   })
 
})
app.post("/login",(req,res)=>{
   bs.login(req.body.accno,req.body.pass).then(result=>
    {
      if(result)
      {
        res.status(result.statusCode).json(result)
        // console.log(bs.userDetails);
      }
      else{
        res.status(result.statusCode).json(result)
      }
    })
 
})
app.post("/deposit",jwtMiddleWare,(req,res)=>{
  bs.deposit(req.body.accno,req.body.passw,req.body.amount).then(result=>{
    if(result)
    {
      res.status(result.statusCode).json(result)
      // console.log(bs.userDetails);
    }
    else{
      res.status(result.statusCode).json(result)
    }
  })
 
})
app.post("/withdrawl",jwtMiddleWare,(req,res)=>{
   bs.withdrawl(req.body.accno,req.body.pass,req.body.amount).then(result=>{
    if(result)
  {
    res.status(result.statusCode).json(result)
    // console.log(bs.userDetails);
  }
  else{
    res.status(result.statusCode).json(result)
  }
   })
  
})
app.post("/transaction",jwtMiddleWare,(req,res)=>{
   bs.getTransaction(req.body.accno).then(result=>{
    if(result){
      res.status(result.statusCode).json(result)
      // console.log(bs.userDetails);
    }
    else{
      res.status(result.statusCode).json(result)
    }
   })
  
})
app.delete("/delete/:accno",jwtMiddleWare,(req,res)=>{
  bs.deleteAcc(req.params.accno).then(result=>{
    if(result)
    {
      res.status(result.statusCode).json(result)
    }
    else
    {
      res.status(result.statusCode).json(result)

    }
  })
})

//resolve api
// app.get("/",(req,res)=>{
//     res.send("Get method working....")
// })
// app.post("/",(req,res)=>{
//     res.send("post method working")
// })
// app.put("/",(req,res)=>{
//     res.send("put method working")
// })
// app.patch("/",(req,res)=>{
//     res.send("patch method working")
// })
// app.delete("/",(req,res)=>{
//     res.send("delete method working")
// })


//port set

app.listen(3001,()=>{
    console.log("served started at port 3000...");
})