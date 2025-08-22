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

app.get("/:username/pay", async (req, res) => {

  const userName = req.params.username;
  // console.log(userName);
    // To Pay Section Data
  const data =
    await db.query(`SELECT fname,amount 
        FROM students st 
        INNER JOIN to_pay tp
        ON st.username = tp.receiver_id WHERE payer_id = '${userName}'`);

  res.json(data[0])
});


app.get("/:username/receive", async (req, res) => {

  const userName = req.params.username;
  // console.log(userName);
    // To Pay Section Data
  const data =
    await db.query(`SELECT fname,amount 
        FROM students st 
        INNER JOIN to_pay tp
        ON st.username = tp.payer_id WHERE receiver_id = '${userName}'`);

  res.json(data[0])
});
app.get("/:username/net", async (req, res) => {
  const userName = req.params.username;
    // To Pay Section Data
  const to_pay_res = await db.query(`SELECT SUM(amount) as to_pay_amount FROM to_pay WHERE payer_id = '${userName}';`);
  const to_receive_res = await db.query(`SELECT SUM(amount) to_receive_amount FROM to_pay WHERE receiver_id = '${userName}';`);

  const {to_pay_amount} = to_pay_res[0][0];
  const {to_receive_amount} = to_receive_res[0][0];

  res.send(to_receive_amount - to_pay_amount);
});

app.get("/:username/fname", async (req,res) => {
    const userName = req.params.username;
    const response = await db.query(`SELECT fname as first_name FROM students WHERE username = '${userName}'`);
    const {first_name} = response[0][0];
    res.send(first_name); 
   
})


app.post("/addmeal", async (req,res) => {
  const formData = req.body;
  // console.log(formData.total_cost);
  const response = await db.query(`INSERT INTO meals (description,total,date) VALUES ('${formData.description}',${formData.total_cost},CURDATE());`);
  console.log(response);
})

