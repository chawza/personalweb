import { Post } from "../../types/post";
import { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import { conn } from '../db';
interface PostQuery extends RowDataPacket, Post {};
interface PostIdsQuerry extends RowDataPacket {
  row: number[]
}

export async function getRecentPost(user_id: number, content = true, limit?: number) {
  const qContent = content ? ', post.content' : '';
  const qLimit = limit ? `LIMIT ${limit}` : ''

  const query = `
    SELECT
      post.id, post.title${qContent}, post.add_date,
      post.last_edit, post.tag, user.username as author
    FROM post
    INNER JOIN user on post.author_id = user.id
    WHERE post.author_id = '${user_id}'
    ORDER BY add_date DESC
    ${qLimit};
  `;

  const [row, _] = await conn.query<PostQuery[]>(query);
  return row.map(post => {
    return {
      ...post,
      add_date:  post.add_date.toString(),
      last_edit: post.last_edit.toString(),
    }
})
};

export async function getAllPostIdByUserId(user_id: number, ): Promise<number[]> {
  const query = `
    SELECT post.id
    from post
    WHERE post.author_id = '${user_id}';
  `
  const [row, _] = await conn.query<PostIdsQuerry[]>(query);

  const ids = row.map(post => post.id)
  return ids;
}

export async function getPostDetail(postId: number): Promise<Post> {
  const query = `
    SELECT
      post.id, post.title, post.content, post.add_date,
      post.last_edit, post.tag, user.username as author
    FROM post
    INNER JOIN user ON post.author_id = user.id
    WHERE post.id = ${postId};
  `
  const [row, _] = await conn.query<PostQuery[]>(query);
  let post = row[0];
  return JSON.parse(JSON.stringify(post)) // Serialize Date
}

export async function addNewPost(
  author_id: number, title: string, content: string, tag: string[] | null
): Promise<number> {
  const qTag = tag ? JSON.stringify(tag): null;
  const query = `
    INSERT INTO post (title, content, tag, author_id) VALUES(
      '${title}',
      '${content}',
      '${qTag}',
      '${author_id}'
    );
  `
  const [result, _] = await conn.execute<ResultSetHeader>(query)
  const { insertId } = result;
  return insertId;
}

export async function deletePostById(postId: string) {
  const query = `
    DELETE FROM post WHERE post.id = ${postId};
  `
  const [okPacket, _] = await conn.execute<OkPacket>(query);
  return okPacket;
};

function dateToDatetimeString(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export async function updatePostById(
  postId: number, title: string, content: string, tag: string[] | null
) {
  const updateDate = new Date();
  const datetimeFormat = dateToDatetimeString(updateDate);
  const qTag = tag ? JSON.stringify(tag): null;

  const query = `
    UPDATE post
    SET
      title='${title}',
      content='${content}',
      tag='${qTag}',
      last_edit='${datetimeFormat}'
    WHERE
      id = ${postId};
  `
  const [ okPacket, _ ] = await conn.execute(query);
  return okPacket 
};
