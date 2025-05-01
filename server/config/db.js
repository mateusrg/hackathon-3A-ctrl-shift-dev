const senhaVictor = "root";
const senhaMateus = "r3hcn@R3m1l5";

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: senhaVictor,
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