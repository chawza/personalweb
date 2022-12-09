const MONTH_STRING = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function capitalFirstLetter(sentence: string) {
  const inWords = sentence.trim().split(' ');
  const capitalizedWorlds = inWords.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
  return capitalizedWorlds.join(' ');
}

const DateFormat = {
  CleanReadable: (date: Date): string => {  
    const dateDate = typeof(date) == 'string' ? new Date(date): date;
    const fullMonth = MONTH_STRING[dateDate.getMonth()];
    const text = `${dateDate.getDate()} ${fullMonth} ${dateDate.getFullYear()}`;
    return text;  
  }
}

export {
  capitalFirstLetter,
  DateFormat
}