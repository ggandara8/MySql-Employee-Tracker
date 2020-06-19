const Department = require("./department");
const Role = require("./role");
const Employee = require("./employee");

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "7171",
    database: "EmployeeTracker_db"
});
  
connection.connect(function(err) {
    if (err) throw err;
    afterConnection();
});
  
function afterConnection() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary FROM employee INNER JOIN department INNER JOIN role ON department.department_id = role.department_id ON employee.role_id = role.role_id", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
}