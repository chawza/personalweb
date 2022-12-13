import { JsonWebTokenError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../lib/auth";
import { saveImgInTempDir } from "../../../../db/blog/image";
import fs from 'fs';

const TEMP_DIR = `${process.cwd()}/temp`;
type ChunckImageQuery = {
  postId: string,
  chunkName: string,
  data: string,
  currentChunk: string,
  chunkLength: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      throw new Error('Authorization token not found!');
    
    const user = verifyToken(auth || '');
  
    if (req.method == 'POST') {
      const { chunkName, currentChunk, chunkLength } = req.query as ChunckImageQuery;
      if (!chunkName || !currentChunk || !chunkLength) {
        throw new Error('Invalid params');
      }
      const tempChunksFilename = `temp_${user.username}_${chunkName}`;
      const tempChunkPath = `${TEMP_DIR}/${tempChunksFilename}`
      if (parseInt(currentChunk) == 0) {
        if (fs.existsSync(tempChunkPath)) {
          fs.unlinkSync(tempChunkPath);
        }
      }
      const chunkBuff = req.read(); 
      fs.appendFileSync(tempChunkPath, chunkBuff);
      if (parseInt(currentChunk) == (parseInt(chunkLength) - 1)) {
        const newFilenames = [];
        const chunkTempFile = fs.readFileSync(tempChunkPath);
        const files = JSON.parse(chunkTempFile.toString());
        for (let file of files) {
          const { filename, imgBase64 : blobFile } = file;
          const imgBase64 = blobFile.split(',')[1];
          const newFilename = saveImgInTempDir(imgBase64, filename);
          newFilenames.push({ oldName: filename, newName: newFilename });
        };
        fs.unlinkSync(tempChunkPath);
        res.json({ savedFilenames: newFilenames });
        return;
      }
      res.json({ message: `Chunck index: ${currentChunk} recieved!` })
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
    bodyParser: false
  }
}