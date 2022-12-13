import mysql from 'mysql2';

const pool = mysql.createPool({
  host      : process.env['DB_CONN_HOSTNAME'],
  user      : process.env['DB_USERNAME'],
  password  : process.env['DB_PASSWORD'],
  database  : process.env['DB_NAME'],
  port      : parseInt(process.env['DB_CONN_PORT']!)
})
const conn = pool.promise();
export {
  conn
}