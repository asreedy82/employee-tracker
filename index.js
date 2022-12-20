const inquirer = require("inquirer");
const express = require('express');
const fs = require('fs');
const cTable = require('console.table');
const questions = require('./helper_files/questions');
const queries = require('./helper_files/queries');
const mysql = require('mysql2');
const { Server } = require("http");
const { response } = require("express");

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
    },
    console.log(`Connected to the biz_personell_db database.`)
);

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//start the app
function mainMenu() {
    inquirer.prompt(questions.mainMenuQuestion)
        .then((response) => {
            if (response.mainMenu === "View all departments") {
                db.query(queries.allDeptSql, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(results);
                    mainMenu();
                });
            } else if (response.mainMenu === "View all roles") {
                db.query(queries.allRolesSql, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(results);
                    mainMenu();
                });
            } else if (response.mainMenu === "View all employees") {
                db.query(queries.allEmpSql, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(results);
                    mainMenu();
                });
            } else if (response.mainMenu === "Add a department") {
                addDept();
            } else if (response.mainMenu === "Add a role") {
                addRole();
            } else if (response.mainMenu === "Add an employee") {
                addEmployee();
            } else if (response.mainMenu === "Update an employee role") {
                updateEmpRole();
            } else if (response.mainMenu === "Update an employee's manager") {
                updateEmpMgr();
            } else if (response.mainMenu === "Save and exit") {
                process.exit(0);
            } else {
                console.log("An error has occurred");
                mainMenu();
            }
        }
        )
};

function addDept() {
    inquirer.prompt(questions.addDeptQuestion)
    .then((response) => {
        if (response.addDept) {
            let newDept = response.addDept;
            db.query(queries.addDeptSql, newDept, (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Added ${newDept} to the database`);
                mainMenu();
            });
        } else {
            console.log("Please enter a name for the department");
        };
    })
};

function addRole() {
    const addRole = new questions.AddRole();
    addRole.findDept();
    inquirer.prompt(addRole.addRoleQuestions)
    .then((response) => {
        if (response.addRoleTitle && response.addRoleSalary && response.addRoleDept) {
            let deptName = response.addRoleDept;
            let deptId = '';
            db.query(queries.getDeptIdSql, deptName, (err,results) => {
                if (err) {
                    console.log(err);
                }
                deptId = results[0].id;
                let newRoleInfo = [response.addRoleTitle, response.addRoleSalary, deptId];
                db.query(queries.addRoleSql, newRoleInfo, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${response.addRoleTitle} to the database`);
                    mainMenu();
                });
            }
            )
        } else {
            console.log("Error adding new role");
        };
    })
};

function addEmployee() {
    const addEmployee = new questions.AddEmployee();
    addEmployee.getRole();
    addEmployee.getMgr();
    inquirer.prompt(addEmployee.addEmpQuestions)
    .then((response) => {
        if (response.addEmpFirstName && response.addEmpLastName && response.addEmpTitle && response.addEmpMgr) {
            let title = response.addEmpTitle;
            let roleId = '';
            let mgrName = response.addEmpMgr;
            let mgrId = '';
            db.query(queries.getRoleIdSql, title, (err, roleResults) => {
                if(err) {
                    console.log(err);
                }
                db.query(queries.getMgrIdSql, mgrName, (err, mgrResults) => {
                    if(err) {
                        console.log(err);
                    }
                    roleId = roleResults[0].id;
                    mgrId = mgrResults[0].id;
                    let newEmpInfo = [response.addEmpFirstName, response.addEmpLastName, roleId, mgrId];
                    db.query(queries.addEmpSql, newEmpInfo, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Added ${response.addEmpFirstName} ${response.addEmpLastName} to the database`);
                        mainMenu();
                    })
                })
            })
        } else {
            console.log("Error adding new employee");
        };
    })
};

function updateEmpRole () {
    const updateEmpRole = new questions.UpdateEmpRole();
    updateEmpRole.getEmp();
    updateEmpRole.getRole();
    inquirer.prompt(updateEmpRole.updateEmpRoleQuestions)
    .then((response) => {
        if (response.selectEmp && response.selectRole) {
            let newTitle = response.selectRole;
            let roleId = '';
            let selectedEmp = response.selectEmp;
            let selectedEmpId = '';
            db.query(queries.getEmpIdSql, selectedEmp, (err, empResults) => {
                if(err) {
                    console.log(err);
                }
                db.query(queries.getRoleIdSql, newTitle, (err, roleResults) => {
                    if(err) {
                        console.log(err);
                    }
                    selectedEmpId = empResults[0].id;
                    roleId = roleResults[0].id;
                    let updatedEmpInfo = [roleId, selectedEmpId];
                    db.query(queries.updateEmpRoleSql, updatedEmpInfo, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Updated ${selectedEmp} to new role of ${newTitle} the database`);
                        mainMenu();
                    })
                })
            })
        }
    })
}

function updateEmpMgr () {
    const updateEmpMgr = new questions.UpdateManager();
    updateEmpMgr.getEmp();
    updateEmpMgr.getMgr();
    inquirer.prompt(updateEmpMgr.updateManagerQuestions)
    .then((response) => {
        if (response.selectEmp && response.updatedMgr) {
            let selectedEmp = response.selectEmp;
            let selectedEmpId = '';
            let mgrName = response.updatedMgr;
            let mgrId = '';
            db.query(queries.getEmpIdSql, selectedEmp, (err, empResults) => {
                if(err) {
                    console.log(err);
                }
                db.query(queries.getMgrIdSql, mgrName, (err, mgrResults) => {
                    if(err) {
                        console.log(err);
                    }
                    selectedEmpId = empResults[0].id;
                    mgrId = mgrResults[0].id;
                    let updateMgrInfo = [mgrId, selectedEmpId];
                    db.query(queries.updateEmpMgr, updateMgrInfo, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Updated ${selectedEmp}'s manager to ${mgrName} in the database`);
                        mainMenu();
                    })
                })
            })
        }
    })
}

mainMenu();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
