const inquirer = require("inquirer");
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'root',
        database: 'biz_personell_db',
        port: 8889
    }
);

// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const mainMenuQuestion = [
    {
        //select from these options
        name: "mainMenu",
        message: "Please select one of these options:",
        type: "list",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Save and exit"],
    },
];

const addDeptQuestion = [
    {
        //new dept name
        name: "addDept",
        message: "What is the name of the new department?",
        type: "input",
    },
];


let deptArray = [];

function AddRole () {
    this.addRoleQuestions = [
            {
                //new role title
                name: "addRoleTitle",
                message: "What is the title of the new role?",
                type: "input",
            },
            {
                //new role salary, department
                name: "addRoleSalary",
                message: "What is the salary of the new role?",
                type: "input",
            },
            {
                //new role department
                name: "addRoleDept",
                message: "What is the department of the new role?",
                type: "list",
                choices: deptArray,
            },
        ];
    this.findDept = () => {
        db.query(`select name from department`, (err, results) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < results.length; i ++) {
                deptArray.push(results[i].name)
            };
        });
    };
};


let roleArray = [];
let mgrArray = [];
function AddEmployee () {
    this.addEmpQuestions = [
        {
            //new employee first name
            name: "addEmpFirstName",
            message: "What is the new employee's first name?",
            type: "input",
        },
        {
            //new employee last name
            name: "addEmpLastName",
            message: "What is the new employee's last name?",
            type: "input",
        },
        {
            //new employee title
            name: "addEmpTitle",
            message: "What is the new employee's title?",
            type: "list",
            choices: roleArray,
        },
        {
            //new employee manager
            name: "addEmpMgr",
            message: "Who is the new employee's manager?",
            type: "list",
            choices: mgrArray,
        },
    ];
    this.getRole = () => {
        db.query(`select title from role`, (err, results) => {
            if(err) {
                console.log(err);
            }
            for (let i = 0; i < results.length; i ++) {
                roleArray.push(results[i].title)
            };
        })
    };
    this.getMgr = () => {
        db.query(`select concat (first_name, " ", last_name) as manager from employee where manager_id is not null`, (err, results) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < results.length; i ++) {
                mgrArray.push(results[i].manager)
            };
        })
    }
}

let empArray = [];
function UpdateEmpRole () {
    this.updateEmpRoleQuestions = [
        {
            //need this because Inquirer won't show a list type question first
            name: "pressEnter",
            message: "Press enter to continue",
            type: "input",
        },
        {
            //select employee
            name: "selectEmp",
            message: "Which employee do you want to update?",
            type: "list",
            choices: empArray,
        },
        {
            //new employee title
            name: "selectRole",
            message: "What is the new employee's title?",
            type: "list",
            choices: roleArray,
        },
    ];
    this.getEmp = () => {
        db.query(`select concat (first_name, " ", last_name) as employee from employee`, (err, results) => {
            if(err) {
                console.log(err);
            }
            for (let i = 0; i < results.length; i ++) {
                empArray.push(results[i].employee)
            };
        })
    };
    this.getRole = () => {
        db.query(`select title from role`, (err, results) => {
            if(err) {
                console.log(err);
            }
            for (let i = 0; i < results.length; i ++) {
                roleArray.push(results[i].title)
            };
        })
    };
}

module.exports = { mainMenuQuestion, addDeptQuestion, AddRole, AddEmployee, UpdateEmpRole };