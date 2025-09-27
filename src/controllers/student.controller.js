import { db } from "../../backend/server.js";

const validateLogin = async (req, res) => {
  const { username, password } = req.body;
  const [response] = await db.query(
    `SELECT * FROM students WHERE username = '${username}' AND password = '${password}'`
  );

  // if user is found in the database
  if (response.length > 0) {
    req.session.username = username;
    res.status(200).send("logged in");
  } else {
    res.status(401).send("not logged in");
  }
};

const getAllStudents = async (req, res) => {
  try {
    const response = await db.query("SELECT * from students");
    res.json(response[0]);
  } catch (err) {
    console.error(err);
  }
};

const getFirstName = async (req, res) => {
  try {
    const userName = req.params.username;
    const response = await db.query(
      `SELECT fname as first_name FROM students WHERE username = '${userName}'`
    );

    const { first_name } = response[0][0];
    res.status(200).send(first_name);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
};

const getKhata = async (req, res) => {
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
            toReceive.push({
              fname: student.fname,
              amount: net_amount,
              username: student.username,
            });
          else
            toPay.push({
              fname: student.fname,
              amount: Math.abs(net_amount),
              username: student.username,
            });
        } else if (toReceiveAmount.length > 0 && toPayAmount.length === 0) {
          toReceive.push({
            fname: student.fname,
            amount: Number(toReceiveAmount[0].amount),
            username: student.username,
          });
        } else if (toPayAmount.length > 0 && toReceiveAmount.length === 0) {
          toPay.push({
            fname: student.fname,
            amount: Number(toPayAmount[0].amount),
            username: student.username,
          });
        }
      })
    );
  };

  await test2();

  res.status(200).json({ to_pay: toPay, to_receive: toReceive });
};

const clearKhata = async (req, res) => {
  try {
    const firstStudent = req.params.firstStudent;
    const secondStudent = req.params.secondStudent;

    // clear khata with user
    await db.query(`DELETE FROM 
      to_pay 
      WHERE (receiver_id = '${firstStudent}' AND payer_id = '${secondStudent}') 
      OR (receiver_id = '${secondStudent}' AND payer_id = '${firstStudent}')`);
    res.send("done");
  } catch (err) {
    console.error(err);
  }
};

export { getAllStudents, getFirstName, getKhata, clearKhata, validateLogin };
