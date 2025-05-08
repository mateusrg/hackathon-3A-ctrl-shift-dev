const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "r3hcn@R3m1l5",
    database: "ctrl_shift_dev"
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Mysql conectado!");
    }
});

module.exports = connection;