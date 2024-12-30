import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './routes/router.js' ;


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', Router);


app.listen(3000, () => {
    console.log('Server is running `http://localhost:3000`');
});