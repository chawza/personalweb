import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const REGEX_PATTERN = {
  IMG_PATTERN: /!\[(.*)\]\((.*)\)/g,
  LINK_PATTERN: /(?<=]\().*(?=\))/,
  HEADING_PATTERN : /#(.*)/,
  CUSTOM_LINK_PATTERN: (customText: string) => new RegExp(`(?<=]\\()${customText}(?=\\))`),
  CUSTOM_IMG_PATTERN: (imagePath: string) => new RegExp(`!\\[(.*)\\]\\(${imagePath}\\)`)
}

const MarkdownConverter = remark()
  .use(remarkGfm)
  .use(remarkHtml);

const ConvertMdToHtml = (mdText: string) => {
  // let text = replaceImagePath(mdText, process.env.ARTICLE_IMG_DIR || './article/imgs');
  const processed = MarkdownConverter.processSync(mdText).toString();
  return processed
}

function getImgFilenamesFromMD(mdText: string): string[] {
  const filenames = [];
  for (let match of mdText.matchAll(REGEX_PATTERN.IMG_PATTERN)) {
    const imgMatch = match[0];
    const filename = imgMatch.match(REGEX_PATTERN.LINK_PATTERN);
    if (!filename) continue;
    filenames.push(filename[0]) 
  }
  return filenames;
}

function replaceImagePath(mdText: string, publicImgDir:string): string {
  let newText = `${mdText}`;
  const imgPaths = [];
  const matchedImage = mdText.matchAll(REGEX_PATTERN.IMG_PATTERN);
  for(let match of matchedImage) {
    const imagePattern = match[0];
    const imgLink = imagePattern.match(REGEX_PATTERN.LINK_PATTERN);
    if (!imgLink) continue;
    const newImglink = `${publicImgDir}/${imgLink[0]}`;
    imgPaths.push(newImglink)
    const newImagePattern = imagePattern.replace(imgLink[0], newImglink);
    newText = newText.replace(imagePattern, newImagePattern);
  }
  return newText;
}

export {
  REGEX_PATTERN,
  getImgFilenamesFromMD,
  MarkdownConverter,
  ConvertMdToHtml,
  replaceImagePath
}