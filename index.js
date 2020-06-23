const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const joined = "SELECT e.id, e.first_name, e.last_name, r.title, department.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) as manager_name FROM employee e INNER JOIN role r ON e.role_id = r.role_id INNER JOIN department ON department.department_id = r.department_id LEFT JOIN employee m ON e.manager_id = m.id";

var currentEmpl = ["John Wick", "Jojo Sanchez", "Jessica Willis", 
"Jerry Star", "Denisse Cabrera","Missy Taylor", "Jack Bauer", "Sam Stevenson", "Nick Miller", "Winston Bishop"];
var currentRoles =["Accounting Clerk", "Mechanical Engineer", "Quality Inspector", 
"Production Assembler", "CS Coordinator"];
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
  
function EmployeeActions() {

    inquirer.prompt(
        {
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add employee", "Add department", "View employees", "View roles", "View Departments", 
            "Update employees", "Delete employee", "Not adding more changes"]
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
        if (answer.options === "Update employees"){
            UpdateEmployeeRoles();
        }
        if (answer.options === "Delete employee"){
            DeleteEmployee();
        }  
        if (answer.options === "Not adding more changes") {
            connection.end();
        }
    });
}

function ViewTable(){
    
    connection.query(joined, function(err, res) {
        if (err) throw err;
        console.table(res);
        EmployeeActions();
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
            type: "list",
            message: "What is the role of the employee?",
            choices: () => {
                for(var i=0; i < currentRoles.length; i++){
                    return currentEmpl;
                }
            }
        }
    ]).then(function(answers){
        var addnames = answers.first_name + " " + answers.last_name;

        currentEmpl.push(addnames);

        if(answers.role === "Accounting Clerk"){
            var roleid = 20;
            var managerid = 6;
        }
        if(answers.role === "Mechanical Engineer"){
            var roleid = 21;
            var managerid = 7;
        }
        if(answers.role === "Quality Inspector"){
            var roleid = 22;
            var managerid = 8;
        }
        if(answers.role === "Production Assembler"){
            var roleid = 23;
            var managerid = 9;
        }
        if(answers.role === "CS Coordinator"){
            var roleid = 24;
            var managerid = 10;
        }
    connection.query("INSERT INTO employee SET ?", 
    { 
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: roleid,
        manager_id: managerid
    }, function(err){
        if(err) throw err;
        EmployeeActions();
    });

    });
}

function UpdateEmployeeRoles(){
    var employees = "SELECT first_name, last_name FROM employeetracker_db.employee";
    // var updateRole = "SELECT role_id FROM employee WHERE id =" +  "UPDATE employee SET role_id = 22 WHERE id =" + ;
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
        connection.query("")
    });
}

function DeleteEmployee(){

}

function ViewEmployeesbyManager(){
    
}

function AddDepartment(){
    inquirer.prompt(
        {
            name:"department",
            type: "input",
            message: "What department do you want to add?"
        }
    ).then(function(answer){
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.department
        }, function(err){
            if(err) throw err;
            EmployeeActions();
        });
    });
}

function ViewRoles(){
    connection.query("SELECT * FROM employeetracker_db.role", function(err, res) {
        if (err) throw err;
        console.table(res);
        EmployeeActions();
    });
}

function ViewDepartments(){
    connection.query("SELECT * FROM employeetracker_db.department", function(err, res) {
        if (err) throw err;
        console.table(res);
        EmployeeActions();
    });
}

function AddRole(){
    inquirer.prompt()
}