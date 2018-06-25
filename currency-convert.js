const axios = require('axios');

const config = require('./config/config.json');

// const getExchangeRate = (from, to) => {
//   return axios.get(`http://data.fixer.io/api/latest?access_key=${config.apiKey}`).then((resp) => {
//     let fromCur = resp.data.rates[from];
//     let toCur = resp.data.rates[to];
//     let rate = toCur/fromCur;
//     return rate;
//   });
// };

const getExchangeRate = async (from, to) => {
    try {
      let reqUrl = await axios.get(`http://data.fixer.io/api/latest?access_key=${config.apiKey}`);
      let fromCur = reqUrl.data.rates[from];
      let toCur = reqUrl.data.rates[to];
      let rate = toCur/fromCur;

      if(isNaN(rate)) {
        throw new Error();
      }
      return rate;

    } catch (e) {
      throw new Error(`Unable to get exchange rate for ${from}, ${to}`);
    }
};

// getExchangeRate('USD', 'CAD').then((rate) => {
//    console.log(rate);
//  });

// getCountryList('USD').then(countries => console.log(countries));


const getCountryList = async (curCode) => {
  try {
    let reqUrl = await axios.get(`https://restcountries.eu/rest/v2/currency/${curCode}`);
    return reqUrl.data.map(list => list.name);
  } catch (e) {
    throw new Error(`Unable to fetch list of countries that use ${$curCode}`);
  }
};


const convertCurrency = async (from, to, amount) => {
  let rate = await getExchangeRate(from, to);
  let convertedAmt = (rate * amount).toFixed(2);
  let toCountryList = await getCountryList(to);
  let parseCntryList = toCountryList.join(', ');
  return `${amount} ${from} is equivalent to ${convertedAmt} ${to}. ${to} is the currency of following countries: ${parseCntryList}.`
};

convertCurrency('USD', 'INR', 20).then(msg => console.log(msg)).catch(e => console.log(e.message));
