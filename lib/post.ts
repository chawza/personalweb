import fs from 'fs';
import matter from 'gray-matter';

const ARTICLES_DIR = `${process.cwd()}/articles`;

export type PostFrontmatter = {
  auhtor: string,
  date: string,
  tags?: string[]
}

export function getPostFilenames() {
  const ignore = ['docs.md', 'imgs'];
  const filenames = fs.readdirSync(ARTICLES_DIR);
  return filenames.filter(name => !ignore.includes(name));
}

export function getPostContentByFilename(filename: string): string {
  const content = fs.readFileSync(`${ARTICLES_DIR}/${filename}`, { encoding: 'utf8' });
  if (!content) throw new Error(`Post content with filename: ${filename} is Empty.`);
  return content;
}

type PostDateCompare = {
  date: Date,
  filename: string
}

export function getRecentPostFilename(last?: number) {
  const filenames = getPostFilenames();
  let mostRecentArticle: PostDateCompare[] = [];

  for(let filename of filenames) {
    const mdContent = fs.readFileSync(`${ARTICLES_DIR}/${filename}`);
    const data = matter(mdContent).data as PostFrontmatter; 
    const postDate = new Date(data.date);

    mostRecentArticle.push({ date: postDate, filename })
  }

  function _compareFn(a: PostDateCompare,  b: PostDateCompare ) {
    if (a.date > b.date) return -1;
    else if (a.date > b.date) return 1;
    return 0;
  }

  return mostRecentArticle.sort(_compareFn).slice(0, last ? last : filenames.length).map(a => a.filename);
}

