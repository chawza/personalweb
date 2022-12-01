import { NextApiRequest, NextApiResponse } from "next"
import { UploadPostSchema } from "../../../schema/blog/schema/blog/post"
import { addNewPost } from "../../../db/blog/post";
import { verifyToken } from "../../../lib/auth";
import { JsonWebTokenError } from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      throw new Error('Authorization token not found!');

    const jwtPayload = verifyToken(auth || ''); 
  
    if (req.method == 'POST') {
      const { id: userId } = jwtPayload;
      const { error, value } = UploadPostSchema.validate(req.body)

      if (error) {
        res.status(400).send(error.details)
        throw error;
      }

      console.log(jwtPayload)

      const newPostId = await addNewPost(
        userId,
        value.title,
        value.content,
        value.tag
      )

      res.status(200).send({
        message: `New article has been added with id: ${newPostId}`,
        postId: newPostId
      })
    }
    else{
      res.status(405).send(`Invalid request method: ${req.method}`)
    }
  }
  catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({ message: 'Invalid Authorization Token' });
    }
    throw error
  }
}