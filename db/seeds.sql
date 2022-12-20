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
        ("Software Engineer", 75000, 4),
        ("Senior Software Engineer", 115000, 4),
        ("Principal Software Engineer", 150000, 4),
        ("Engineering Manager", 150000, 4),
        ("VP of Engineering", 175000, 4),
        ("HR Coordinator", 50000, 5),
        ("Senior HR Coordinator", 90000, 5),
        ("Director of Human Resources", 110000, 5);


--employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Billy", "Holiday", 3, null),
        ("Ella", "Fitzgerald", 2, 1),
        ("Dean", "Martin", 1, 1),
        ("Miles", "Davis", 6, null),
        ("Diana", "Ross", 5, 4),
        ("Frank", "Sinatra", 4, 5),
        ("Johnny", "Cash", 11, null),
        ("Dolly", "Parton", 10, 7),
        ("Hank", "Williams", 9, 8),
        ("Chet", "Atkins", 8, 8),
        ("June", "Carter", 7, 8),
        ("Fiona", "Apple", 14, null),
        ("Ben", "Folds", 13, 12),
        ("Huey", "Lewis", 12, 12);