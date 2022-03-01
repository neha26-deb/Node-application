import mysql from 'mysql2/promise';
import MySQLStore from 'express-mysql-session';




var options ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'nehadb1'
}

var sessionConnection = mysql.createPool(options);
export var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable:  true,
    schema:{
        tableName: 'sessions',
        columnNames:{
           session_id: 'session_id',
           expires: 'expires',
           data: 'data'
        }
    }
},sessionConnection)






 