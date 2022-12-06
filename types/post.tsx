export interface Post {
  id: string,
  title: string,
  author: string,
  content: string,
  add_date: Date,
  last_edit: Date,
  tag: string[] | null,
}
