import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

import streamlabsRoutes from './routes/streamlabs.routes'
dotenv.config()

const app = express();

// Settings
app.set('port',process.env.PORT);

// Middlewares
app.use(morgan('dev'))

// welcome routes
app.get("/",(req,res) => {
    res.json({
        message: "Welcome to my proxy API services"
    })
})

// routes
app.use("/api/streamlabs", streamlabsRoutes)
export default app