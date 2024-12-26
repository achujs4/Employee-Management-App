const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// database
let employees = [
  { id: 1, name: "Anuja", designation: "Software Engineer", location: "Trivandrum", salary: 60000 },
  { id: 2, name: "Rahul", designation: "Project Manager", location: "Kochi", salary: 80000 },
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { employees });
});

app.get("/add", (req, res) => {
  res.render("addEmployee");
});

app.post("/add", (req, res) => {
  const { name, designation, location, salary } = req.body;
  const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
  employees.push({ id, name, designation, location, salary: parseFloat(salary) });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const employee = employees.find((emp) => emp.id === parseInt(req.params.id));
  res.render("editEmployee", { employee });
});

app.post("/edit/:id", (req, res) => {
  const { id, name, designation, location, salary } = req.body;
  const index = employees.findIndex((emp) => emp.id === parseInt(id));
  if (index !== -1) {
    employees[index] = { id: parseInt(id), name, designation, location, salary: parseFloat(salary) };
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  employees = employees.filter((emp) => emp.id !== parseInt(req.params.id));
  res.redirect("/");
});




const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on 5001`);
});
