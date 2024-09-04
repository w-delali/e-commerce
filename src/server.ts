import express from "express";
import {PORT} from "./secrets";


const app = express()

app.get("/",(req,res)=>{
    console.log("App working")
})
app.listen(PORT,()=>{
    console.log(`App listening to PORT ${PORT}`)
})