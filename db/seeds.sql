--department
INSERT INTO department (name)
VALUES ("Accounting"),
       ("Sales"),
       ("Operations"),
       ("Egineering"),
       ("Human Resources");

-- role
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Accountant", 50000, 1),
        ("Senior Accountant", 90000, 1),
        ("VP of Accounting", 150000, 1),
        ("Sales Associate", 50000, 2),
        ("Senior Sales Manager", 85000, 2),
        ("Regional Sales VP", 150000, 2),
        ("VP of Accounting", 150000, 1),
        ("Software Engineer", 75000, 3),
        ("Senior Software Engineer", 115000, 3),
        ("Principal Software Engineer", 150000, 3),
        ("Engineering Manager", 150000, 3),
        ("VP of Engineering", 175000, 3),
        ("HR Coordinator", 50000, 4),
        ("Senior HR Coordinator", 90000, 4),
        ("Director of Human Resources", 110000, 4);

--employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Billy", "Holiday", 3, null),
        ("Ella", "Fitzgerald", 2, 1),
        ("Dean", "Martin", 1, 1),
        ("Miles", "Davis", 6, null),
        ("Diana", "Ross", 5, 4),
        ("Frank", "Sinatra", 4, 5),
        ("Johnny", "Cash", 11, null),
        ("Dolly", "Parton", 10, 11),
        ("Hank", "Williams", 9, 10),
        ("Chet", "Atkins", 8, 10),
        ("June", "Carter", 7, 10),
        ("Fiona", "Apple", 14, null),
        ("Ben", "Folds", 13, 14),
        ("Huey", "Lewis", 12, 14);