function capitalFirstLetter(sentence: string) {
  const inWords = sentence.trim().split(' ')
  const capitalizedWorlds = inWords.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
  return capitalizedWorlds.join(' ');
}

export {
  capitalFirstLetter 
}