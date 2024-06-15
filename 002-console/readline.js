#!/usr/bin/env node

const readline = require('readline');

const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

rl.question('Загадано число в диапазоне от 0 до 100: ', (answer) => {
  const num = Math.round(Math.random()*100);

  const doPrompt = (str) => {
    rl.setPrompt(str);
    rl.prompt();
  };

  const makeGuess = (answer) => {
    const guess = Number(answer);
    if (guess < num) {
      doPrompt('Больше \n')
      return;
    }
    if (guess > num) {
      doPrompt('Меньше \n')
      return;
    }
    console.log(`Отгадано число ${num}`);
    rl.close();
  }

  makeGuess(answer);

  rl.on('line', makeGuess)
});
