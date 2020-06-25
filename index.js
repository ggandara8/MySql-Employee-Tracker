const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const joined = "SELECT e.id, e.first_name, e.last_name, r.title, department.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) as manager_name FROM employee e INNER JOIN role r ON e.role_id = r.role_id INNER JOIN department ON department.department_id = r.department_id LEFT JOIN employee m ON e.manager_id = m.id";

var currentEmpl = ["John Wick", "Jojo Sanchez", "Jessica Willis", 
"Jerry Star", "Denisse Cabrera"];

var currentMan = ["Missy Taylor", "Jack Bauer", "Sam Stevenson", "Nick Miller", "Winston Bishop"];

var currentRoles =["Accounting Clerk", "Mechanical Engineer", "Quality Inspector", "Production Assembler",
 "CS Coordinator", "Accounting Manager", "Engineering Manager", "Quality Manager", "Production Manager", "CS Manager"];

var currentDept = ["Accounting", "Engineering", "Quality", "Production", "Customer Service"];

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
    EmployeeActions();
});

//Start
function EmployeeActions() {

    inquirer.prompt(
        {
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add employee", "Add department", "Add Role", "View employees", "View roles", "View Departments", 
            "Update employees", "Not adding more changes"]
        }
    ).then(function(answer){
        
        if (answer.options === "View employees"){
            ViewTable();
        }
        if (answer.options === "View roles"){
            ViewRoles();
        }
        if (answer.options === "View Departments"){
            ViewDepartments();
        }
        if (answer.options === "Add employee"){
            AddEmployee();
        }
        if (answer.options === "Add department"){
            AddDepartment();
        }
        if (answer.options === "Add Role"){
            AddRole();
        }
        if (answer.options === "Update employees"){
            UpdateEmployeeRoles();
        }  
        if (answer.options === "Not adding more changes") {
            connection.end();
        }
    });
}
// View Full Table
function ViewTable(){
    
    connection.query(joined, function(err, res) {
        if (err) throw err;
        console.table(res);
        EmployeeActions();
    });
    
}
//View Roles
function ViewRoles(){
    connection.query("SELECT * FROM employeetracker_db.role", function(err, res) {
        if (err) throw err;
        console.table(res);
        EmployeeActions();
    });
}
// View Departments
function ViewDepartments(){
    connection.query("SELECT * FROM employeetracker_db.department", function(err, res) {
        if (err) throw err;
        console.table(res);
        EmployeeActions();
    });
}
// Add Employees
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
            type: "list",
            message: "What is the role of the employee?",
            choices: () => {
                for(var i=0; i < currentRoles.length; i++){
                    return currentRoles;
                }
            }
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the manager of the employee?",
            choices: () => {
                for(var i=0; i < currentMan.length; i++){
                    return currentMan;
                }
            }
        }
    ]).then(function(answers){
        var addnames = answers.first_name + " " + answers.last_name;

        currentEmpl.push(addnames);
    connection.query("SELECT role_id from role WHERE ?", {title: answers.role},function(err, res){
        if(err) throw err;
        var roleId = res[0].role_id;
      
    connection.query("INSERT INTO employee SET ?", 
    { 
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: roleId,
        // manager_id: managerId
    }, function(err){
        if(err) throw err;
        EmployeeActions();
    });  
    }); 
    });
}

function AddDepartment(){
    inquirer.prompt(
        {
            name:"department",
            type: "input",
            message: "What department do you want to add?"
        }
    ).then(function(answer){
        var addDept = answer.department;

        currentDept.push(addDept);

        connection.query("INSERT INTO department SET ?",
        {
            name: answer.department
        }, function(err){
            if(err) throw err;
            EmployeeActions();
        });
    });
}

function AddRole(){
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What role do you wish to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
        },
        {
            name: "department",
            type: "list",
            message: "In what department will this role belong?",
            choices: () => {
                for(var i=0; i < currentDept.length; i++){
                    return currentDept;
                }
            }
        }
    ]).then(function(answers){
        var addTitle = answers.title;
        var addSalary = answers.salary;

        currentRoles.push(addTitle);
        connection.query("SELECT department_id from department WHERE ?", {name: answers.department}, function(err, res){
            if(err) throw err;
            var deptId = res[0].department_id;

            connection.query("INSERT INTO role SET ?", {
                title: addTitle,
                salary:addSalary,
                department_id: deptId 
            }, function(err){
                if(err) throw err;
                EmployeeActions();
            });
        });  
    });
}

// Update Employees 
function UpdateEmployeeRoles(){
    var Selectroleid = "SELECT role_id FROM role WHERE title ?";
    var concat = "CONCAT(first_name, ' ', last_name)";
    var SelectFullname = `SELECT CONCAT(first_name, ' ', last_name) as full_name FROM employee WHERE ${concat} ?`;
    // var updateRole = `UPDATE employee SET role_id = ${} WHERE ${} ?`;
    inquirer.prompt([
        {
            name: "employee_update",
            type: "list",
            message: "Which employee do you want to update the role?",
            choices: () => {
                for(var i=0; i < currentEmpl.length; i++){
                    return currentEmpl;
                }
            }
        },
        {
            name: "role_update",
            type:"list",
            message: "What is the new role of the employee?",
            choices: () => {
                for(var i=0; i < currentRoles.length; i++){
                    return currentRoles;
                }
            }
            
        }
    ]).then(function(answers){
        connection.query(`SELECT CONCAT(first_name, ' ', last_name) as full_name FROM employee WHERE ${concat}?`, answers.employee_update, function(err,res){
            if(err) throw err;
            EmployeeActions();
        });
    });
}