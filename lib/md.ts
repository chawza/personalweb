

const REGEX_PATTERN = {
  IMG_PATTERN: /!\[(.*)\]\((.*)\)/g,
  LINK_PATTERN: /(?<=]\().*(?=\))/,
  HEADING_PATTERN : /#(.*)/,
  CUSTOM_LINK_PATTERN: (customText: string) => new RegExp(`(?<=]\\()${customText}(?=\\))`),
  CUSTOM_IMG_PATTERN: (imagePath: string) => new RegExp(`!\\[(.*)\\]\\(${imagePath}\\)`)
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

export {
  REGEX_PATTERN,
  getImgFilenamesFromMD
}