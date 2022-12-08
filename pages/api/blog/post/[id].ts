import { JsonWebTokenError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteimageByName } from "../../../../db/blog/image";
import { deletePostById, getPostDetail } from "../../../../db/blog/post";
import { verifyToken } from "../../../../lib/auth";
import { getImgFilenamesFromMD } from "../../../../lib/md";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      throw new Error('Authorization token not found!');

    const jwtPayload = verifyToken(auth || ''); 
    
    if (req.method == 'DELETE') {
      const { id } = req.query;
      if (!id) {
        throw new Error('Invlaid URL path / query');
      }
      const post = await getPostDetail(parseInt(id.toString()));
      const filenames = getImgFilenamesFromMD(post.content);
      if (filenames) {
        filenames.map(filename => deleteimageByName(filename));
      }
      const okPacket = await deletePostById(post.id);
      if (okPacket.affectedRows < 1)
        throw new Error('Row delete failed. Number row affected' + okPacket.affectedRows);
      res.status(200).send({
        message: `Post with with id: ${post.id} has been deleted.`
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
    else if (error instanceof Error) {
      res.status(500).send({
        message: error.message,
        name: error.name
      })
    }
  }
}