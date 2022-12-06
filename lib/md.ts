const REGEX_PATTERN = {
  IMG_PATTERN: /!\[(.*)\]\((.*)\)/g,
  LINK_PATTERN: /(?<=]\().*(?=\))/,
  CUSTOM_LINK_PATTERN: (customText: string) => new RegExp(`(?<=]\()${customText}(?=\))`)
}

export {
  REGEX_PATTERN
}