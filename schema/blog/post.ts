import Joi from 'joi';
import joi from 'joi';

const BaseSchema = {
  title: joi.string().max(255).min(8),
  content: joi.string(),
  tag: joi.array().items(joi.string()).unique().allow(null),
  imgFilenames: Joi.array().items(Joi.string()).optional()
} 
const UploadPostSchema = joi.object(BaseSchema)

const UpdatePostSchema = Joi.object({
  ...BaseSchema,
  id: Joi.string(),
  newFilenames: Joi.array().items(joi.string()).optional().allow(null)
});

type PostImage = {
  name: string;
  file: string
}

export interface UploadPostType {
  title: string;
  content: string;
  tag? : string[];
  imgs? : PostImage[];
  imgFilenames?: string[];
}

export {
  UploadPostSchema,
  UpdatePostSchema,
}