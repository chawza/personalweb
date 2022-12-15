import fs from 'fs';
import { nanoid } from "nanoid";

const ABSOLUTE_IMG_DIR_PATH = process.env.PUBLIC_IMG_DIR; 
const ABSOULTE_TEMP_IMG_DIR_PATH = process.env.TEMP_IMAGE_DIR;

type newFilename = string;

function saveImageToDb(imageBase64: string, filename: string) : newFilename {
  const newFileName = `${nanoid()}_${filename}`;
  const fileSavePath = `${ABSOLUTE_IMG_DIR_PATH}/${newFileName}`;
  const decodedImage = Buffer.from(imageBase64, 'base64');
  console.log(fileSavePath)
  fs.writeFileSync(fileSavePath, decodedImage);
  return newFileName
}

function saveImgInTempDir(imageBase64: string, filename: string) {
  const newFileName = `${nanoid()}_${filename}`;
  const fileSavePath = `${ABSOULTE_TEMP_IMG_DIR_PATH}/${newFileName}`;
  const decodedImage = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(fileSavePath, decodedImage);
  return newFileName
}

function moveTempImgToDb(filename: string) {
  const oldpath = `${ABSOULTE_TEMP_IMG_DIR_PATH}/${filename}`;
  const newpath= `${ABSOLUTE_IMG_DIR_PATH}/${filename}`;
  fs.renameSync(oldpath, newpath);
}

function deleteimageByName(filename: string) {
  const fileSavePath = `${ABSOLUTE_IMG_DIR_PATH}/${filename}`;
  fs.unlinkSync(fileSavePath)
}

export {
  saveImageToDb,
  deleteimageByName,
  saveImgInTempDir,
  moveTempImgToDb,
}