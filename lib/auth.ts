import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import fs from 'fs';
import { verifyUserAuth } from '../db/auth/user';

const PRIVATE_KEY = fs.readFileSync(process.cwd() + '\\key\\private.pem')

type JwtPayload = {
  username: string,
  id: number
}


async function createToken(username: string, password: string) {
  const { username: verifiedUsername, id } : JwtPayload = await verifyUserAuth(username, password);
  const token = jwt.sign({ username: verifiedUsername, id }, PRIVATE_KEY);
  return token;
}

function verifyToken(token: string): JwtPayload{
  const jwToken = token.split(' ')[1];
  const payload = jwt.verify(jwToken, PRIVATE_KEY)
  return payload as JwtPayload;
}

function readTokenPayload(token: string) {
  let payload = token.split('.')[1]
  payload = atob(payload)
  return JSON.parse(payload);
}

function createJwtToken(payload: object) {
  const token = jwt.sign(payload, PRIVATE_KEY);
  return token;
}

export {
  createToken,
  verifyToken,
  readTokenPayload,
  createJwtToken
}