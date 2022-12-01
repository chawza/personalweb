import { RowDataPacket } from "mysql2";
import { conn } from "../db";

interface getUserIdType extends RowDataPacket {
  id: number
}

export async function getUserIdByUsername(user_id: id): Promise<number> {
  const connection = await conn;
  const [ result , _ ] = await connection.execute<getUserIdType[]>(`
    SELECT id FROM user WHERE username='${user_id}';
  `);
  const { id } = result[0];
  return id;
}
