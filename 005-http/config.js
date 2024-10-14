const env = process.env;
const apiKey = env.apiKey;
const createUrl = (city = 'Moscow') => `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

exports.createUrl = createUrl;
