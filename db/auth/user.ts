import mysql, { RowDataPacket } from 'mysql2/promise';

const conn = mysql.createConnection({
  host      : process.env['DB_CONN_HOSTNAME'],
  user      : process.env['DB_USERNAME'],
  password  : process.env['DB_PASSWORD'],
  database  : process.env['DB_NAME'],
  port      : parseInt(process.env['DB_CONN_PORT']!)
})

interface userQuery extends RowDataPacket {
  username: string,
  id: number
}

class NoUserFoundError extends Error {
  constructor(message?: string) {
    super(message || 'NoUserFoundError');
    this.name = 'NoUserFoundError';
  }
}

export async function verifyUserAuth(username: string, password: string) {
  console.log(`${username}\t${password}`)
  const query = `SELECT id, password FROM user WHERE user.username='${username}' AND user.password='${password}';`
  const [row, _] = await (await conn).execute<userQuery[]>(query);
  if (row.length == 0) {
    throw new NoUserFoundError();
  }
  return { username: row[0].username, id: row[0].id };
}

export {
  NoUserFoundError
}