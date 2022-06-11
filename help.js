const text = `
/start - Ботни ишга тушириш
/darslar - Дарслар
/harflar - Ҳарфлар
/kalimalar - Калималар
/tahlil - Талаффуз таҳлили
/help - Ёрдам
`;

const commandsList = text
  .match(/(- )+(.*)/g)
  .join(",")
  .replace(/(- )/g, "")
  .split(",")
  .slice(1, -1);

module.exports = { helpTextLines: text, commandsList };
