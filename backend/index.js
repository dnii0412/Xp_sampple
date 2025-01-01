import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import connectDB from './utils/db.js'

dotenv.config({});

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true}));

// preventing from malicious users
app.use(cookieParser());
const corsOptions = {
    // restrincting requests from localhost
    origin: 'http://localhost:5173',
    // allow cookies and other credentials to be sent in cross-origin requests
    credentials: true
}
app.use(cors(corsOptions));

// port config for express
const PORT = process.env.PORT || 3000;
// use the port comgin from dotenv if it is available
// if there is not a port that matches the port, use 3000 port instead of dotenv port config

// route handlers
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('api/v1/application', applicationRoute);
// v1(version 1) is declared as initial basic user creation and login endpoints 
// and each of these 4 lines of code will handle requests related user, comapny, job and app

app.listeners(PORT, () => {
    connectDB();
    console.log(`Server is listening on ${PORT}`)
})