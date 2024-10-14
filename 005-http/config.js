const env = process.env;
const apiKey = env.apiKey;
const argKey = 'city';
const city = env[`npm_config_${argKey}`];
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

exports.url = url;
