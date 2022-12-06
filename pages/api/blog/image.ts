import { JsonWebTokenError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../lib/auth";
import { saveImageToDb } from "../../../db/blog/image";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      throw new Error('Authorization token not found!');
    
      console.log(auth)
    verifyToken(auth || '');
  
    if (req.method == 'POST') {
      const { filename, file } = req.body;
      const newFilename = saveImageToDb(file, filename);   
      res.status(200).send({
        message: `New image has been added with name: ${newFilename}`,
        filename: newFilename
      })
    }
    else{
      res.status(405).send(`Invalid request method: ${req.method}`)
    }
  }
  catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(401).send({
        message: 'Invalid Authorization Token',
        name: error.name,
      });
    }
    else if (error instanceof Error) {
      res.status(500).send({
        message: error.message,
        name: error.name
      })
    }
  }
}

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '10mb'
      }
  }
}