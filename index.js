require('dotenv').config();
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from "morgan";
import path from 'path';
import dbConfig from './config/db.config'

dbConfig.connectMyDb()

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
const PORT = 8000


// http://localhost:8000/uploads/files/1700299708448.flower.jpg

app.use('/api', require('./routes/')) // routes

app.get("/", (req, res) => { res.json({ message: "Welcome ........." }); });


app.listen(PORT, () => {
    console.log(`server running ${PORT}`)

});
