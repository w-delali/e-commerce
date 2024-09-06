import dotenv from "dotenv";


dotenv.config({
    path:process.env.NODE_ENV?`env.${process.env.NODE_ENV}`:".env"
})


const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET


export {PORT,JWT_SECRET}