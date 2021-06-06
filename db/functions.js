const inquirer = require('inquirer');
const db = require('./connection');
const mainQ = require('../index')

const newDepartment = function () {
    inquirer.prompt(
        {
            type: "input",
            name: "depTitle",
            message: "What would you like to name this department?"
        })
        .then(depart => {
            let call = `INSERT INTO department (name) VALUE (?)`;

            let param = [depart.depTitle];

            db.query(call, param, (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);

                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                    mainQ();
                })
            })
            
        })
};

const newEmployee = function () {
    let managers = [];

    db.query(`SELECT first_name FROM employee
    WHERE role_id = 1`, (err, result) => {
        if (err) {
            console.log(err)
        }
        result.forEach(element => { managers.push(element.first_name) });
        managers.push("null");

        inquirer.prompt([{
            type: "input",
            name: "first",
            message: "What is the first name of your employee?"
        }, {
            type: "input",
            name: "last",
            message: "What is the last name of your employee?"
        }, {
            type: "list",
            name: "role",
            message: "What role does this employee fill?",
            choices: ["manager", "engineer", "salesman", "accountant"]
        }, {
            type: "list",
            name: "manager",
            message: "Who is this employees manager?",
            choices: managers
        }]).then(employee => {

            let param = "";

            if (employee.role === "manager") {
                param = 1;
            }
            if (employee.role === "engineer") {
                param = 2;
            }
            if (employee.role === "salesman") {
                param = 3;
            }
            if (employee.role === "accountant") {
                param = 4;
            }
            if (employee.role === "null") {
                param = 0;
            }

            let manParam;

            db.query(`SELECT id, first_name FROM employee`, (err, result) => {
                if (err) {
                    console.error;
                }
                result.forEach(element => {
                    if (employee.manager === element.first_name) {
                        manParam = element.id;
                    }
                })


                let call = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`

                let params = [employee.first, employee.last, param, manParam];

                db.query(call, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    db.query(`SELECT * FROM employee`, (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.table(result); 
                        mainQ();
                    })
                })
            })
        });
    })
};
const addRole = function () {
    let roles = [];

    db.query(`SELECT name FROM department`, (err, result) => {
        if (err) {
            console.error;
        }
        result.forEach(element => roles.push(element.name));

        inquirer.prompt([{
            type: "input",
            name: "roleTitle",
            message: "What is the title of this role?"
        }, {
            type: "input",
            name: "roleSal",
            message: "What is the yearly salary of this role? (Must be INT)"
        }, {
            type: "list",
            name: "roleDep",
            message: "What is the department of this role?",
            choices: roles
        }]).then(role => {

            let param;

            db.query(`SELECT id, name FROM department`, (err, result) => {
                if (err) {
                    console.log("error")
                }
                result.forEach(element => {
                    if (role.roleDep === element.name) {
                        param = element.id;
                    }
                })



                let call = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`

                let params = [role.roleTitle, role.roleSal, param];

                db.query(call, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);

                    db.query(`SELECT * FROM role`, (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.table(result);
                        mainQ();
                    })
                })
            })
        })
    })
};

const upEmployee = function () {
    let employeeArr = [];

    let roleArr = [];

    db.query(`SELECT title FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        result.forEach(element => {
            roleArr.push(element.title);
        })
        db.query(`SELECT first_name FROM employee`, (err, result) => {
            if (err) {
                console.log(err);
            }

            result.forEach(element => {
                employeeArr.push(element.first_name);
            })
            inquirer.prompt([{
                type: "list",
                name: "choice",
                message: "Which employee do you want to update?",
                choices: employeeArr
            }, {
                type: "list",
                name: "role",
                message: "What is the new role?",
                choices: roleArr

            }]).then(updatedData => {

                let call = `UPDATE employee SET role_id=? WHERE id=?`;

                let nameId;
                let roleId;

                db.query(`SELECT id, first_name FROM employee`, (err, result) => {
                    if (err) {
                        console.error;
                    }
                    result.forEach(element => {
                        if (updatedData.choice === element.first_name) {
                            nameId = element.id;
                        }
                    })

                    db.query(`SELECT id, title FROM role`, (err, result) => {
                        if (err) {
                            console.error;
                        }
                        result.forEach(element => {
                            if (updatedData.role === element.title) {
                                roleId = element.id;
                            }
                        })


                        let params = [roleId, nameId];

                        db.query(call, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(result);

                            db.query(`SELECT * FROM employee`, (err, result) => {
                                if (err) {
                                    console.log(err)
                                }
                                console.table(result);
                                mainQ();
                            })
                        })
                    })
                })
            })
        })
    })
};

module.exports = { addRole, newDepartment, newEmployee, upEmployee };