import { NextApiRequest, NextApiResponse } from "next"
import { UpdatePostSchema, UploadPostSchema } from "../../../schema/blog/post";
import { addNewPost, deletePostById, getPostDetail, updatePostById } from "../../../db/blog/post";
import { verifyToken } from "../../../lib/auth";
import { JsonWebTokenError } from 'jsonwebtoken'
import { deleteimageByName, moveTempImgToDb } from "../../../db/blog/image";
import { getImgFilenamesFromMD } from "../../../lib/md";

class UserError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'UserError';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      throw new Error('Authorization token not found!');

    const jwtPayload = verifyToken(auth || ''); 
  
    if (req.method == 'POST') {
      const { id: userId } = jwtPayload;
      const { error, value: body } = UploadPostSchema.validate(req.body)

      if (error) {
        res.status(400).send(error.details)
        throw error;
      }
      
      const { title, content, tag, imgFilenames } = body;

      const newPostId = await addNewPost(
        userId,
        title,
        content,
        tag,
      );

      if (imgFilenames) {
        for(let filename of imgFilenames) {
          moveTempImgToDb(filename);
        }
      }

      res.status(200).send({
        message: `New article has been added with id: ${newPostId}`,
        postId: newPostId
      })
      return;
    }
    else if (req.method == 'DELETE') {
      const { id } = req.query;
      if (!id) {
        throw new Error('Invlaid URL path / query');
      }
      const post = await getPostDetail(parseInt(id.toString()));
      const filenames = getImgFilenamesFromMD(post.content);
      try {
        if (filenames) {
          filenames.map(filename => deleteimageByName(filename));
        }
      } catch(error) {
        console.error('failed to delete images', error)
      }
      const okPacket = await deletePostById(post.id);
      if (okPacket.affectedRows < 1)
        throw new Error('Row delete failed. Number row affected' + okPacket.affectedRows);
      res.status(200).send({
        message: `Post with with id: ${post.id} has been deleted.`
      });
      return;
    }
    else if (req.method == 'PATCH') {
      const { error, value: body } = UpdatePostSchema.validate(req.body)
      if (error) {
        res.status(400).send(error.details)
        throw error;
      }
      
      const { title, content, tag, newFilenames, id } = body;
      const _ = await updatePostById(parseInt(id.toString()), title, content, tag);
      if (newFilenames) {
        for(let filename of newFilenames) {
          moveTempImgToDb(filename);
        }
      } 
      res.status(200).send({
        message: `Article updated!`,
      });
      return;
    } 
    else{
      res.status(405).send(`Invalid request method: ${req.method}`)
    }
  }
  catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({ message: 'Invalid Authorization Token' });
    }
    else if (error instanceof Error) {
      res.status(500).send({
        message: error.message,
        name: error.name
      })
    }
  }
}