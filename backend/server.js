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
    dateStrings : true
  })
  .promise();

app.listen(3000, () => console.log("server is running at port 3000."));

app.get("/:username/account", async (req, res) => {
  const userName = req.params.username;

  // To Pay Section Data
  const [students] = await db.query(
    `SELECT fname,username FROM students WHERE username != '${userName}'`
  );

  const toPay = [];
  const toReceive = [];

  const test2 = async () => {
    await Promise.all(
      students.map(async (student) => {
        const [toReceiveAmount] = await db.query(
          `SELECT SUM(amount) as amount 
      FROM students st 
      INNER JOIN to_pay tp 
      ON st.username = tp.payer_id 
      WHERE receiver_id = '${userName}' AND payer_id = '${student.username}' 
      GROUP BY fname`
        );

        const [toPayAmount] = await db.query(
          `SELECT SUM(amount) as amount 
      FROM students st 
      INNER JOIN to_pay tp 
      ON st.username = tp.payer_id 
      WHERE receiver_id = '${student.username}' AND payer_id = '${userName}' 
      GROUP BY fname`
        );

        // Case : where one student both, pays and receives, so we calculate net
        if (toReceiveAmount.length > 0 && toPayAmount.length > 0) {
          const net_amount = toReceiveAmount[0].amount - toPayAmount[0].amount;

          if (net_amount > 0)
            toReceive.push({ fname: student.fname, amount: net_amount,
          username : student.username });
          else
            toPay.push({ fname: student.fname, amount: Math.abs(net_amount),
          username : student.username });
        } else if (toReceiveAmount.length > 0 && toPayAmount.length === 0) {
          toReceive.push({
            fname: student.fname,
            amount: Number(toReceiveAmount[0].amount),
            username : student.username
          });
        } else if (toPayAmount.length > 0 && toReceiveAmount.length === 0) {
          toPay.push({
            fname: student.fname,
            amount: Number(toPayAmount[0].amount),
            username : student.username
          });
        }
      })
    );
  };

  await test2();

  res.json({ to_pay: toPay, to_receive: toReceive });
});

app.get("/:username/fname", async (req, res) => {
  try {
    const userName = req.params.username;
    const response = await db.query(
      `SELECT fname as first_name FROM students WHERE username = '${userName}'`
    );
    const { first_name } = response[0][0];
    res.send(first_name);
  } catch (err) {
    console.error(err);
  }
});

const countStudents = (participatedStudents) => {
  let n = 0;
  for (const username in participatedStudents) {
    if (participatedStudents[username]) n++;
  }
  return n + 1;
};

app.post("/addmeal", async (req, res) => {
  const formData = req.body;
  const participatedStudents = formData.participated;

  // we will insert user given data into meals table and then fetch latest meal_id
  // using MAX() because we will want to add all students that participated in this meal
  await db.query(
    `INSERT INTO meals (description,total,date) VALUES ('${formData.description}',${formData.total_cost},CURDATE());`
  );

  const new_meal_id = await db.query(
    `SELECT MAX(meal_id) as meal_id FROM meals;`
  );
  const { meal_id } = new_meal_id[0][0];

  // Add payer first
  await db.query(
    `INSERT INTO students_meals VALUES ('${formData.paid_by}',${meal_id},'payer')`
  );

  const n = countStudents(participatedStudents);
  const amountPerPerson = Math.round(formData.total_cost / n);

  // add participants
  for (const username in participatedStudents) {
    if (participatedStudents[username]) {
      await db.query(
        `INSERT INTO students_meals VALUES ('${username}',${meal_id},'participant')`
      );
      await db.query(
        `INSERT INTO to_pay VALUES ('${username}','${formData.paid_by}',${meal_id},${amountPerPerson})`
      );
    }
  }
});

app.get("/meals", async (req, res) => {
  try {
    const [response] = await db.query("SELECT * FROM meals");
    res.json(response);
  } catch (err) {
    console.error(err);
  }
});

app.get("/:meal_id/participants", async (req, res) => {
  try {
    // Get meal id from url
    const meal_id = Number(req.params.meal_id);
    const [response] = await db.query(
      `SELECT fname,role FROM students_meals NATURAL JOIN students WHERE meal_id = ${meal_id}`
    );
    res.json(response);
  } catch (err) {
    console.error(err);
  }
});

app.get("/students", async (req, res) => {
  try {
    const response = await db.query("SELECT * from students");
    res.json(response[0]);
  } catch (err) {
    console.error(err);
  }
});


app.delete("/:primaryUser/:secondaryUser/clearAccount", async (req,res) => {
  try {
    const primaryUser = req.params.primaryUser;
    const secondaryUser = req.params.secondaryUser;

    // clear khata with user
    await db.query(`DELETE FROM 
      to_pay 
      WHERE (receiver_id = '${primaryUser}' AND payer_id = '${secondaryUser}') 
      OR (receiver_id = '${secondaryUser}' AND payer_id = '${primaryUser}')`);
  } catch (err) {
    console.error(err);
  }
});
