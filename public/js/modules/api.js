import { data } from "./data.js";

export let api = {
  checkStorage: overview => {
    if (localStorage.getItem("topCryptoCoins") === null) {
      api.getMarket(overview);
    } else {
      data.fromStorage(overview);
    }
  },
  getMarket: async overview => {
    let key = "4921adba-8213-4159-950e-35edf261684a";
    let currency = "EUR";
    let cors = "https://cors-anywhere.herokuapp.com/";
    let limit = "50"; //Limit to the amount of coins I'm requesting
    let api =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1";
    let url = `${cors}${api}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;

    let response = await fetch(url);
    response = await response.json();
    data.cleanMarket(response, overview);
  },
  getCoin: async coin => {
    // coin = parameter
    let key =
        "9d6d39b44ce2c90274169966fe79fe681cc7e97016d062449ebaa6631e17758e",
      currency = "EUR",
      //
      dayLimit = "30", //30 days + today
      dayApi = "https://min-api.cryptocompare.com/data/v2/histoday?",
      dayUrl = `${dayApi}fsym=${coin}&tsym=${currency}&limit=${dayLimit}&api-key=${key}`,
      //
      hourLimit = "23", // 23 hour in a day, right?
      hourApi = "https://min-api.cryptocompare.com/data/v2/histohour?",
      hourUrl = `${hourApi}fsym=${coin}&tsym=${currency}&limit=${hourLimit}&api-key=${key}`,
      //
      dayResponse = await fetch(dayUrl),
      hourResponse = await fetch(hourUrl);

    dayResponse = await dayResponse.json();
    hourResponse = await hourResponse.json();
    let coinData = {
      day: dayResponse,
      hour: hourResponse
    };

    data.cleanCoin(coinData, coin);
  }
};
