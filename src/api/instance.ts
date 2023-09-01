import axios from 'axios';

const API_KEY = process.env.TWELVEDATA_API_KEY;

const instanceApi = axios.create({
   baseURL: 'https://api.twelvedata.com',
   params: {
      source: 'docs',
      apikey: API_KEY,
   },
});

export default instanceApi;
