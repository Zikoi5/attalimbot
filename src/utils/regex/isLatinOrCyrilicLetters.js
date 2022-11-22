function isLatinOrCyrilicLetters(str) {
  return /^[a-zA-Zа-яА-ЯЁ ]+$/.test(str);
}

module.exports = isLatinOrCyrilicLetters;
