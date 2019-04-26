const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'test'
});

connection.connect();

let queryUser  = "SELECT * FROM USER";
function resultDeal(error,result){
    if(error){
        console.log("SELECT ERROR-",error.message);
        return;
    }
    console.log("\n查询结果");
    console.log(result);
}
connection.query(queryUser,resultDeal);
connection.query("show tables",resultDeal);
connection.end();