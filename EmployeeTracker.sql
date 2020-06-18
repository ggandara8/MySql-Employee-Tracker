DROP DATABASE IF EXISTS EmployeeTracker_db;
CREATE DATABASE EmployeeTracker_db;

USE EmployeeTracker_db;

CREATE TABLE department (
    department_id INT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
    role_id INT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY(role_id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO department (department_id, name)
VALUES (10, "Accounting"), (11, "Engineering"), (12, "Quality"), (13, "Production"), (14, "Customer Service");

INSERT INTO role (role_id, title, salary, department_id)
VALUES (20, "Accounting Clerk", 60000, 10), (21, "Mechanical Engineer", 80000, 11), (22, "Quality Inspector", 50000, 12), 
(23, "Production Assembler", 40000, 13), (24, "CS Coordinator", 45000, 14);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wick", 21, 7), ("Jojo", "Sanchez", 20, 6), ("Jessica", "Willis", 22, 20), ("Jerry", "Star", 23, 40), ("Denisse", "Cabrera", 24, 34),
("Missy", "Taylor", 20, 76), ("Jack", "Bauer", 21, 26); 




