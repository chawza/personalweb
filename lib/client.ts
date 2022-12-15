import { UserState } from "../context/BlogContext";

const POST_IMAGE_PATHNAME = `/api/blog/image`;
const PUBLIC_IMAGE_PATHNAME = `/public/images`;
const POST_IMAGES_BUFFER_PATHNAME = '/api/blog/image/sync'

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

function getUserDataFromJwt(jwToken: string): UserState | null {
  if (!jwToken) return null;
  const payloadString = jwToken.split('.')[1];
  const decodedPayload = atob(payloadString);
  const payload = JSON.parse(decodedPayload);
  return {
    username: payload.username as string,
    id: parseInt(payload.id)
  }
}

export {
  POST_IMAGE_PATHNAME,
  PUBLIC_IMAGE_PATHNAME,
  POST_IMAGES_BUFFER_PATHNAME,
  cookHeader,
  checkUserIsLoggedIn,
  getUserDataFromJwt
}
