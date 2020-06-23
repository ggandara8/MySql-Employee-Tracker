DROP DATABASE IF EXISTS EmployeeTracker_db;
CREATE DATABASE EmployeeTracker_db;

USE EmployeeTracker_db;

CREATE TABLE department (
    department_id INT  NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT,
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
ALTER TABLE role auto_increment=20;
ALTER TABLE department auto_increment=10;

INSERT INTO department (name)
VALUES ("Accounting"), ("Engineering"), ("Quality"), ("Production"), ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Accounting Clerk", 60000, 10), ("Mechanical Engineer", 80000, 11), ("Quality Inspector", 50000, 12), 
("Production Assembler", 40000, 13), ("CS Coordinator", 45000, 14), ("Accounting Manager", 70000, 10), ("Engineering Manager", 95000, 11),
("Quality Manager", 70000, 12), ("Production Manager", 70000, 13), ("CS Manager", 70000, 14);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wick", 21, 7), ("Jojo", "Sanchez", 20, 6), ("Jessica", "Willis", 22, 8), ("Jerry", "Star", 23, 9), ("Denisse", "Cabrera", 24, 10),
("Missy", "Taylor", 25, 76), ("Jack", "Bauer", 26, 26), ("Sam", "Stevenson", 27, 88), ("Nick", "Miller", 28, 89), ("Winston", "Bishop", 29, 90); 




