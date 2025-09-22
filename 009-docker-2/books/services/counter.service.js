const axios = require('axios');
const COUNTER_URL = process.env.COUNTER_URL;

console.log('counter service init')

const client = axios.create({
  baseURL: COUNTER_URL,
  timeout: 5000,
})

const getCounter = async (id) => {
  const value = await client.get(`/counter/${id}`);
  return value;
};

const incrementCounter = async (id) => {
  await client.post(`/counter/${id}/incr`);
};

module.exports = {
  getCounter,
  incrementCounter,
}