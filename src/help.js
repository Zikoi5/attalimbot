const text = `
/start - Ботни ишга тушириш
/harflar - Ҳарфлар
/help - Ёрдам
`;

const commandsList = text
  .match(/(- )+(.*)/g)
  .join(",")
  .replace(/(- )/g, "")
  .split(",")
  .slice(1, -1);

module.exports = { helpTextLines: text, commandsList };
