const POST_IMAGE_PATHNAME = `/api/blog/image`;
const PUBLIC_IMAGE_PATHNAME = `/public/images`

function cookHeader() {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${localStorage.getItem('jwt') || ''}`);
  headers.append('Content-Type', 'application/json')
  return headers
}

export {
  POST_IMAGE_PATHNAME,
  PUBLIC_IMAGE_PATHNAME,
  cookHeader
}
