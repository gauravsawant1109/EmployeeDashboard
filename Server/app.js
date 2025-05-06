import express from "express"
import cors from "cors"
import employeeRoutes from './Routes/Route.js';
import dotenv from 'dotenv';
import path from 'path'
import { dirname } from 'path';
import "./Configuration/Cofig.js"
const app = express();

// Middleware Connections
app.use(cors())
app.use(express.json())

//image path 
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));
console.log(__dirname)


app.use('/api/employees', employeeRoutes);

// Connection
const PORT = 5000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})