const Department = require("./department");
const Role = require("./role");
const Employee = require("./employee");

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const joined = "SELECT e.id, e.first_name, e.last_name, r.title, department.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) as manager_name FROM employee e INNER JOIN role r ON e.role_id = r.role_id INNER JOIN department ON department.department_id = r.department_id LEFT JOIN employee m ON e.manager_id = m.id";

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

    inquirer.prompt(
        {
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add employee", "View employees", "Update employees"]
        }
    ).then(function(answer){
        
        if (answer.options === "View employees"){
            ViewEmployees();
        }
        if (answer.options === "Add employee"){
            AddEmployee();
        }
        if (answer.options === "Update employee"){
            UpdateEmployee();
        } else {
            connection.end();
        }
    });
}

function ViewEmployees(){
    
    connection.query(joined, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}

function AddEmployee(){
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the role of the employee?",
            choices: ["Accounting Clerk", "Mechanical Engineer", "Quality Inspector", "Production Assembler", "CS Coordinator"]
        }
    ]).then(function(answers){
    connection.query("INSERT INTO employee SET ?", {}, function(err, results){
        
        console.log(results);
    });
    });
    connection.end();
}

function UpdateEmployee(){

}