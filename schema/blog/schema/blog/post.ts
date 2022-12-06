import joi from 'joi';

export const UploadPostSchema = joi.object({
  title: joi.string().max(255).min(8),
  content: joi.string(),
  tag: joi.array().items(joi.string()).unique().allow(null),
  imgs: joi.array().optional().items(joi.object({
    name: joi.string().required(),
    file: joi.string().base64().required()
  }))
})

type PostImage = {
  name: string;
  file: string
}

export interface UploadPostType {
  title: string;
  content: string;
  tag? : string[];
  imgs? : PostImage[]
}
