import { PostFrontmatter } from "../lib/post";

export interface Post {
  data: PostFrontmatter
  content: string,
  slug: string
}
