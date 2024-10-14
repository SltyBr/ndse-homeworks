const http = require('http');
const { createUrl } = require('./config.js');

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const doPrompt = (str) => {
  rl.setPrompt(str);
  rl.prompt();
};

rl.question('В каком городе узнать погоду? ', (answer) => {
  const url = createUrl(answer);
  makeRequest(url);

  rl.on('line', (answer) => {
    const url = createUrl(answer);
    makeRequest(url)
  })
});

const makeRequest = (url) => {
  http.get(url, (res) => {
    const {statusCode, statusMessage} = res;

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    })
    res.on('end', () => {
      if (statusCode !== 200) {
        console.log(`statusCode ${statusCode}, message ${statusMessage}`);
        rl.close();
        return;
      }
      const {location: {name}, current: {temp_c, last_updated}} = JSON.parse(rawData);
      const message = `The weather in ${name} at ${last_updated} is ${temp_c}°C`;
      console.log(message);
      doPrompt('В каком ещё городе узнать погоду? ')
    })
  }).on('error', (error) => {
    console.log(error);
    rl.close();
  });
}