const db = require('./db/connection');
const inquirer = require('inquirer');
const { questions, addDepartment, addEmployee, addRole, updateEmployee } = require('./db/questions');
const { startApp, viewAllD, viewAllE, viewAllR, rolefiller, roleArr, employeeArr, employeeFiller } = require('./db/sqlcommands.js');

const Choices = require('inquirer/lib/objects/choices');

startApp()

inquirer.prompt(questions).then(answers => {

    if (answers.start === "view all departments") {
        viewAllD();
    }
    if (answers.start === "view all employees") {
        viewAllE();
    }
    if (answers.start === "view all roles") {
        viewAllR();
    }
    if (answers.start === "add a department") {
        inquirer.prompt(addDepartment).then(depart => {
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
                })
            })
        })
    };
    if (answers.start === "add a role") {
        inquirer.prompt(addRole).then(role => {
            let call = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`

            let params = [role.roleTitle, role.roleSal, role.roleDep];

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
                })
            })
        })
    };
    if (answers.start === "add an employee") {

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
                        })
                    })
                })
            });
        })
    };
    if (answers.start === "update an employee role") {

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
                        })
                    })
                })
            })
        })
    })
})
    };
});
