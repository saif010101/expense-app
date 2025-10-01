import { db } from "../../backend/server.js";

const getAllMeals = async (req, res) => {
  try {
    const index = Number(req.params.index);
    const [response] = await db.query(`SELECT * FROM meals ORDER BY date DESC LIMIT 5 OFFSET ${ 3 * (index - 1)}`);
    res.json(response);
  } catch (err) {
    console.error(err);
  }
};

const countStudents = (participatedStudents) => {
  let n = 0;
  for (const username in participatedStudents) {
    if (participatedStudents[username]) n++;
  }
  return n + 1;
};

const addMeal = async (req, res) => {
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

  console.log(participatedStudents);
  
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

  res.send("done!");
};

const getMealParticipants = async (req, res) => {
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
};

export { getAllMeals, addMeal,getMealParticipants };
