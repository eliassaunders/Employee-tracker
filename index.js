const db = require('./db/connection');

const starterQ = `DROP DATABASE IF EXISTS manager;`;
const makeD = `CREATE DATABASE manager;`;
const useD = `USE manager;`
const makeT = `source db/schema.sql;`;
const populateT = `source db/seeds.sql;`;

const startApp = () => {
    db.query(starterQ, (err, result) => {
        if(err) {
            console.error;
        } else {
            console.log("success");
        }
    });

    db.query(makeD, (err, result) => {
        if (err) {
            console.error;
        } else {
            console.log("success");
        }
    });

    db.query(useD, (err, result) => {
        if(err) {
            console.error;
        } else {
            console.log("success");
        }
    });

    db.query(makeT, (err, result) => {
        if (err) {
            console.error;
        } else {
            console.log("success");
        }
    });

    db.query(populateT, (err, result) => {
        if(err) {
            console.error;
        } else {
            console.log("success");
        }
    });
};

startApp();

db.query(`SELECT * FROM employee`, (err, result) => {
    if(err) {
        console.error;
    } else {
        console.log(result);
    }
});

