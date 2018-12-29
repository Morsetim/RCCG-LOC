import {Client} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DEV_URL;
const client = new Client(connectionString);

client.connect();


const createTable = () => {
    const query = ` 
    DROP TABLE IF EXISTS users CASCADE;

  DROP TABLE IF EXISTS entries CASCADE;
  
  CREATE TABLE IF NOT EXISTS users(
  
    id SERIAL PRIMARY KEY,
  
    fullname VARCHAR(150) NOT NULL,
  
    email VARCHAR(255) NOT NULL,
  
    password VARCHAR(255) NOT NULL
  );`

    client.query(query, (err) =>{
        if(err){
            return err.message;
        }
        client.end();
    }
    );
};
createTable();