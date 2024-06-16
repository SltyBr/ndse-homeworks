const { getFilePath, yargsHelper } = require('./helpers.js');
const { readFile } = require('fs');

const argv = yargsHelper.option('filename', {
  alias: '-f',
  type: 'string',
  default: 'logs',
}).argv;

const { filename } = argv;

const filePath = getFilePath(filename);

const parseData = (data) => {
  const lines = data.trim().split('\n');
  const count = lines.length;
  const result = lines.map((line) => {
    const [target, guess, result] = line.trim().split(', ');
    return Object.fromEntries([target.split(' '), guess.split(' '), result.split(' ')]);
  });
  const winsCount = result.filter((game) => game.result === 'win');
  const loseCount = result.filter((game) => game.result === 'lose');
  return {
    count,
    wins: winsCount.length,
    loss: loseCount.length,
    winRate: winsCount.length / result.length,
  };
};

readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('Файл не найден');
      return;
    }
  }
  const { count, wins, loss, winRate } = parseData(data);
  console.log(`Количество партий ${count}, Выигранные/проигранные ${wins}/${loss}, винрейт ${winRate}`);
});
