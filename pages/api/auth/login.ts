import { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "../../../lib/auth";
import { NoUserFoundError } from "../../../db/auth/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    try {
      const { username, password } = req.body;
      const token = await createToken(username, password);
      res.status(200).send({ message: 'login success', jwtToken: token });
    }
    catch (error) {
      if (error instanceof NoUserFoundError) {
        res.status(400).send({ message: "Invalid Authentication"})
        return
      }
      throw error;
    }
  }
  else{
    res.status(400).send(`Invalid request method: ${req.method}`)
  }
}