import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "roommates_db",
  })
  .promise();

app.listen(3000, () => console.log("server is running at port 3000."));

app.get("/", async (req, res) => {
    // To Pay Section Data
  const data =
    await db.query(`SELECT fname,amount 
        FROM students st 
        INNER JOIN to_pay tp
        ON st.username = tp.receiver_id WHERE payer_id = 'p230512'`);

  res.json(data[0])
});

app.get("/name",(req,res) => {
    
})
