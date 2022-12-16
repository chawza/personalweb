const BLOG_OWNER_NAME = (() => {
  const name = process.env.BLOG_OWNER_USERNAME;
  if (!name) throw new Error("Env BLOG_OWNER_USERANME is not found!");
  return name
})();

const PRIVATE_KEY = (() => {
  const name = process.env.PRIVATE_KEY_PEM;
  if (!name) throw new Error("Private PEM key not found in PRIVATE_KEY_PEM env variablles");
  return name
})();

export {
  BLOG_OWNER_NAME,
  PRIVATE_KEY
}