const axios = require('axios');
const COUNTER_URL = process.env.COUNTER_URL;

const client = axios.create({
  baseURL: COUNTER_URL,
  timeout: 5000,
})

const getCounter = async (id) => {
  try {
    const value = await client.get(`/counter/${id}`);
    return value;
  } catch (e) {
    return {
      data: {
        value: 0,
      }
    };
  }
};

const incrementCounter = async (id) => {
  try {
    await client.post(`/counter/${id}/incr`);
  } catch (e) {
    console.log('counter service not available')
  }
};

module.exports = {
  getCounter,
  incrementCounter,
}