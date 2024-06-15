const { getFilePath, getFileName, yargsHelper } = require('./helpers.js');

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const { writeFile, appendFile, existsSync } = require('fs');

const argv = yargsHelper.option('filename', {
  alias: '-f',
  type: 'string',
  default: 'logs',
}).argv;

const filePath = getFilePath(argv.filename);
const filename = getFileName(filePath);

const target = Math.round(Math.random()) + 1;

rl.question('Орел или решка? ', (answer) => {
  const result = target === Number(answer) ? 'win' : 'lose';
  const content = `target ${target}, guess ${answer}, result ${result}\n`;

  if (existsSync(filename)) {
    appendFile(filePath, content, (err) => {
      if (err) throw new Error();
      console.log(result);
    });
  } else {
    writeFile(filePath, content, (err) => {
      if (err) throw new Error();
      console.log(result);
    });
  }
  rl.close();
});
