import jwt from 'jsonwebtoken';
import fs from 'fs';
import { verifyUserAuth } from '../db/auth/user';

const PRIVATE_KEY = fs.readFileSync(process.cwd() + '\\key\\private.pem')

async function login(username: string, password: string) {
  const { username: verifiedUsername, id } = await verifyUserAuth(username, password);
  const token = jwt.sign({ username: verifiedUsername, id }, PRIVATE_KEY);
  return token;
}

function verify(token: string) {
  const payload = jwt.verify(token, PRIVATE_KEY)
  return payload
}

export {
  login,
  verify
}