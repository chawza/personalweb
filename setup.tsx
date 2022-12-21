const ARTICLES_DIR = (() => {
  const name = process.env.ARTICLE_MD_DIR;
  if (!name) throw new Error("ARTICLE_MD_DIR variable not found!");
  return name
})();

const ARTICLES_IMGS_DIR = (() => {
  const name = process.env.ARTICLE_IMG_DIR;
  if (!name) throw new Error("ARTICLE_IMG_DIR variable not found");
  return name
})();

export {
  ARTICLES_DIR,
  ARTICLES_IMGS_DIR
}