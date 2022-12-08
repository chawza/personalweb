import fs from 'fs';
import { nanoid } from "nanoid";

const IMAGE_DIR_PATH = '/public/images';
const ABSOLUTE_IMG_DIR_PATH = process.cwd() + IMAGE_DIR_PATH;

type newFilename = string;

function saveImageToDb(imageBase64: string, filename: string) : newFilename {
  const newFileName = `${nanoid()}_${filename}`;
  const fileSavePath = `${ABSOLUTE_IMG_DIR_PATH}/${newFileName}`;
  const decodedImage = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(fileSavePath, decodedImage);
  return newFileName
}

function deleteimageByName(filename: string) {
  const fileSavePath = `${ABSOLUTE_IMG_DIR_PATH}/${filename}`;
  fs.unlinkSync(fileSavePath)
}

export {
  saveImageToDb,
  deleteimageByName,
  IMAGE_DIR_PATH,
}