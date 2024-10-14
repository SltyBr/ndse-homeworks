const http = require('http');
const { url } = require('./config.js');

http.get(url, (res) => {
  const {statusCode, statusMessage} = res;

  if (statusCode !== 200) {
    console.log(`statusCode ${statusCode}, message ${statusMessage}`);
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  })
  res.on('end', () => {
    const {location: {name}, current: {temp_c, last_updated}} = JSON.parse(rawData);
    const message = `The weather in ${name} at ${last_updated} is ${temp_c}°C`
    console.log(message);
  })
}).on('error', (error) => {
  console.log(error)
})