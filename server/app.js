import express from 'express';
import bodyParser from 'body-parser';
import apiRoute from './routes/router';
// import dotenv from 'dotenv';
import { CLIENT_RENEG_LIMIT } from 'tls';

// dotenv.config();

const app = express();
const port = (process.env.PORT) || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v2', apiRoute);

app.get('/', (req, res) =>{
  res.send({
    message:'Welcome RCCG-LOC Youth & Young Adult Church'
  });
});
app.use('*', (req, res) =>{
  res.status(404)
    .json({
      status: 'Failed',
      message: 'Page Not Found'
    });
});


app.listen(port, () => {console.log(`Application listening at port ${port}`);});

export default app;
