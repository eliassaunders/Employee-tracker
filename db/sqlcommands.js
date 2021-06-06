const db = require('./connection');


let roleArr = [];
let employeeArr = [];

const rolefiller = () => {
    db.query(`SELECT title FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        result.forEach(element => {
            roleArr.push(element.title);
        })
    })
};

const employeeFiller = () => {
    db.query(`SELECT first_name last_name FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        result.forEach(element => {
            employeeArr.push(element.title);
        })
    })
}


const viewAllD = () => {
    let command = `SELECT * FROM department`

    db.query(command, (err, data) => {
        if (err) {
            console.log("An error occured");
        }
        console.table(data);
    })
}

const viewAllE = () => {
    let command = `SELECT * FROM employee`

    db.query(command, (err, data) => {
        if (err) {
            console.log("An error occured");
        }
        console.table(data);
    })
}

const viewAllR = () => {
    let command = `SELECT * FROM role`

    db.query(command, (err, data) => {
        if (err) {
            console.log("An error occured");
        }
        console.table(data);
    })
}



const startApp = () => {
    db.query(`source ./db/schema.sql;`, (err, result) => {
        if (err) {
            console.error;
        }
        console.log("success");

        db.query(`source ./db/seeds.sql;`, (err, result) => {
            if (err) {
                console.error;
            }
            console.log("success");

        });
    });
};

module.exports = { startApp, viewAllD, viewAllE, viewAllR, rolefiller, roleArr, employeeArr, employeeFiller };