CREATE TABLE employee (
    emp_id int(10) primary key,
    emp_name varchar(20),
    designation varchar(15),
    address varchar(10),
    mobile_no int,  
    dateofbirth date,
    email varchar(25)
);

ALTER TABLE employee
  MODIFY COLUMN mobile_no bigint;

INSERT INTO employee (emp_id, emp_name, designation, address, mobile_no, dateofbirth, email) VALUES
(101, 'Priya', 'Developer', 'Villupuram', 8369452789, '2002-12-27', 'priya@gmail.com'),
(102, 'Chutki', 'Tester', 'Chennai', 8569741269, '2001-05-15', 'chutki@gmail.com'),
(103, 'Raju', 'Developer', 'Puducherry', 7563289745, '2003-07-08', 'raju@gmail.com');

CREATE TABLE department (
  dept_id int(11) primary key,
  dept_name varchar(20),
  emp_id int(11),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);

INSERT INTO department (dept_id, dept_name, emp_id) VALUES
(201, 'Manager', 101),
(202, 'Developer', 102),
(203, 'Tester', 103);

-- LEFT JOIN
SELECT * FROM employee LEFT JOIN department ON employee.emp_id = department.emp_id;

-- RIGHT JOIN
SELECT * FROM employee RIGHT JOIN department ON employee.emp_id = department.emp_id;

-- INNER JOIN
SELECT * FROM employee INNER JOIN department ON employee.emp_id = department.emp_id;
