import { REGEX_PATTERN } from "../lib/md";

export function getPostTitle(mdFile: string) {
  const lines = mdFile.split('\n');
  const heading = lines.find(line => REGEX_PATTERN.HEADING_PATTERN.test(line));
  if (heading) {
    return heading.slice(1).trim()
  }
  return null;
}
