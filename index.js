const db = require('./db/connection');
const inquirer = require('inquirer');

const { startApp, viewAllD, viewAllE, viewAllR } = require('./db/sqlcommands.js');
const {addRole, newDepartment, newEmployee, upEmployee} = require('./db/functions');

const Choices = require('inquirer/lib/objects/choices');

startApp()

const mainQ = function() {
    inquirer.prompt( {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ["view all departments", "view all employees", "view all roles", "add a department", "add a role", "add an employee", "update an employee role"]
    })
    .then(answers => {
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
        newDepartment();
    };
    if (answers.start === "add a role") {
        addRole();
    };
    if (answers.start === "add an employee") {
        newEmployee();
    };
    if (answers.start === "update an employee role") {
        upEmployee();
    };
});
}

mainQ();


    
    




