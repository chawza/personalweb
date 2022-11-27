import joi from 'joi';

const UploadPostSchema = joi.object({
  title: joi.string().max(255).min(8),
  content: joi.string(),
  tag: joi.array().items(joi.string()).unique()
})

export {
  UploadPostSchema
}