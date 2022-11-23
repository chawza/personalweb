import { Post } from "../../types/post";
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

const POST_PER_PAGE = 10;

const conn = mysql.createConnection({
  host      : process.env['DB_CONN_HOSTNAME'],
  user      : process.env['DB_USERNAME'],
  password  : process.env['DB_PASSWORD'],
  database  : process.env['DB_NAME'],
  port      : parseInt(process.env['DB_CONN_PORT']!)
})

async function fetchHandler(url: URL, method = 'GET'){
  const res = await fetch(
    url.toString(),
    {
      method,
    }
  )
  if (res.status >= 300) {
    const message = `${res.status}:${res.statusText} from ${res.url}`;
    console.error(message);
    throw message;
  }
  return res;
};

interface PostQuery extends RowDataPacket, Post {};
interface PostIdsQuerry extends RowDataPacket {
  row: number[]
}

export async function getRecentPost(page?: number, content: boolean = false) {
  const qPage = page || 1;
  const qLimit = `${(qPage - 1) * POST_PER_PAGE}, ${(qPage * POST_PER_PAGE) - 1}`;
  const qContent = content ? ', post.content' : '';

  const query = `
    select
      post.id, post.title${qContent}, post.add_date,
      post.last_edit, post.tag, user.username as author
    from post
    inner join user on post.author_id = user.id
    order by add_date desc limit ${qLimit};
  `;

  const [row, _] = await (await conn).query<PostQuery[]>(query);
  let posts = row.map(post => {
    return {
      ...post,
      add_date:  post.add_date.toString(),
      last_edit: post.last_edit.toString(),
    }
  })
  
  return posts;
};

export async function getAllPostIds(): Promise<number[]> {
  const query = 'SELECT post.id from post;'
  const [row, _] = await (await conn).query<PostIdsQuerry[]>(query);

  const ids = row.map(post => post.id)
  return ids;
}

export async function getPostDetail(postId: number): Promise<Post> {
  const query = `
    select
      post.id, post.title, post.content, post.add_date,
      post.last_edit, post.tag, user.username as author
    from post
    inner join user on post.author_id = user.id
    where post.id = ${postId}`;
  const [row, _] = await (await conn).query<PostQuery[]>(query);
  let post = row[0];
  return JSON.parse(JSON.stringify(post)) // Serialize Date
}