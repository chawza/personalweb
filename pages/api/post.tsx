const SERVER_HOST = process.env['SERVER_HOST'];
const SERVER_BLOG_API_ROUTE = process.env['BLOG_API_ROUTE'];

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

export async function getRecentPost(page: string | undefined, limit?: number) {
  console.log(SERVER_HOST, SERVER_BLOG_API_ROUTE)
  const url = new URL(`${SERVER_HOST}/${SERVER_BLOG_API_ROUTE}/post`);
  url.searchParams.append('page', page == undefined ? '1' : page);
  if (limit) url.searchParams.append('limit', limit.toString());
  
  const res = await fetchHandler(url);
  const body = await res.json();
  return {
    posts: body.posts
  };
};