import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const mongo_url = process.env.MONGO_URL
mongoose
    .connect(`mongodb+srv://${mongo_username}:${mongo_password}${mongo_url}`,
    {useUnifiedTopology: true},
    {useNewUrlParser: true})
    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err));
