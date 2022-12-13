import { RowDataPacket } from "mysql2";
import { conn } from "../db";

interface getUserIdType extends RowDataPacket {
  id: number
}

export async function getUserIdByUsername(user_id: number): Promise<number> {
  const [ result , _ ] = await conn.execute<getUserIdType[]>(`
    SELECT id FROM user WHERE username='${user_id}';
  `);
  const { id } = result[0];
  return id;
}
