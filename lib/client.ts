const POST_IMAGE_PATHNAME = `/api/blog/image`;
const PUBLIC_IMAGE_PATHNAME = `/public/images`

function cookHeader() {
  const headers = new Headers()
  const jwToken = localStorage.getItem('jwt')
  if (jwToken)
    headers.append('Authorization', `Bearer ${localStorage.getItem('jwt') || ''}`);
  headers.append('Content-Type', 'application/json')
  return headers
}

function checkUserIsLoggedIn(): boolean {
  if (localStorage.getItem('jwt')) return true;
  else return false;
}
export {
  POST_IMAGE_PATHNAME,
  PUBLIC_IMAGE_PATHNAME,
  cookHeader,
  checkUserIsLoggedIn
}
