function isLatinOrCyrilicLetters(str) {
  return /^[a-zA-Zа-яА-ЗёЁ ]+$/.test(str);
}

module.exports = isLatinOrCyrilicLetters;
