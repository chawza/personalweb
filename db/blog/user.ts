import { RowDataPacket } from "mysql2";
import { conn } from "../db";

interface getUserIdType extends RowDataPacket {
  id: number
}

export async function getUserIdByUsername(username: string): Promise<number> {
  const [ result , _ ] = await conn.execute<getUserIdType[]>(`
    SELECT id FROM user WHERE username='${username}';
  `);
  const { id } = result[0];
  return id;
}
