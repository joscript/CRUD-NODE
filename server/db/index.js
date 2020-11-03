const mysql = require('mysql');

// allows to make queries and to manage connection
const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'crud',
    host: 'localhost',
    port: '3306'
});

let crudDb = {};

crudDb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users`, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}   

crudDb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE id = ?`, [id], (err, results) => {    
            if(err)return reject(err);
            return resolve(results[0]);
        }); 
    });
}

crudDb.create = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO users (first_name, last_name) VALUES (${data})`, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}   

crudDb.update = (id, data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE users SET ${data} WHERE id = ${id}`, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}   

crudDb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM users WHERE id = ?`, [id], (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}

module.exports = crudDb