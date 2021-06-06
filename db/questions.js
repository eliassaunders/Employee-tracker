const questions = [
    {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ["view all departments", "view all employees", "view all roles", "add a department", "add a role", "add an employee", "update an employee role"]
    } 
]

const addDepartment = [{
    type: "input",
    name: "depTitle",
    message: "What would you like to name this department?"
}];

const addRole = [{
    type: "input",
    name: "roleTitle",
    message: "What is the title of this role?"
}, {
    type: "input",
    name: "roleSal",
    message: "What is the yearly salary of this role? (Must be INT)"
}, {
    type: "input",
    name: "roleDep",
    message: "What is the department(id) of this role? (value 1-X)"
}];

const addEmployee = [{
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
    message:"What role does this employee fill?",
    choices: ["manager", "engineer", "salesman", "accountant"]
}, {
    type: "input",
    name: "manager",
    message: "Who is this employees manager?"
}];


module.exports = {questions, addDepartment, addEmployee, addRole}
