function capitalFirstLetter(sentence: string) {
  try {
    const inWords = sentence.split(' ')
    const capitalizedWorlds = inWords.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    return capitalizedWorlds.join(' ');
  } catch (error) {
    console.log(sentence)
    throw(error)
  }

}

export {
  capitalFirstLetter 
}