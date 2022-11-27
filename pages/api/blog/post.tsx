import { NextApiRequest, NextApiResponse } from "next"
import { UploadPostSchema } from "../../../schema/blog/schema/blog/post"
import { addNewPost } from "../../../db/blog/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { error, value } = UploadPostSchema.validate(req.body)
    if (error) {
      res.status(400).send(error.details)
      throw error;
    }

    const newPostId = await addNewPost(
      value.title,
      value.content,
      value.tag
    )

    res.status(300).send({
      message: `New article has been added with id: ${newPostId}`,
      postId: newPostId
    })
  }
  else{
    res.status(400).send(`Invalid request method: ${req.method}`)
  }
}