const BLOG_OWNER_NAME = (() => {
  const name = process.env.BLOG_OWNER_USERNAME;
  if (!name) throw new Error("Env BLOG_OWNER_USERANME is not found!");
  return name
})();

export {
  BLOG_OWNER_NAME
}