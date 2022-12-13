import { RowDataPacket } from 'mysql2/promise';
import { conn } from '../db';

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
  const [row, _] = await conn.execute<userQuery[]>(query);
  if (row.length == 0) {
    throw new NoUserFoundError();
  }
  return { username: row[0].username, id: row[0].id };
}

export {
  NoUserFoundError
}