import { data } from "./data.js";
import { render } from "./render.js";

export let api = {
  check: async overview => {
    if (localStorage.getItem("topCryptoCoins") === null) {
      let coins = await api.getMarket();
      let renderData = overview ? render.overview(coins) : data.toplist(coins);
    } else {
      let coins = await data.fromStorage();
      let renderData = overview ? render.overview(coins) : data.toplist(coins);
    }
  },
  getMarket: async () => {
    let key = "4921adba-8213-4159-950e-35edf261684a";
    let currency = "EUR";
    let cors = "https://cors-anywhere.herokuapp.com/";
    let limit = "50"; //Limit to the amount of coins I'm requesting
    let api =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1";
    let url = `${cors}${api}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;

    let response = await fetch(url);
    response = await response.json();
    let coins = await data.cleanMarket(response);
    return coins;
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
    let cleanDayCoin = await data.cleanCoin(dayResponse);
    let cleanHourCoin = await data.cleanCoin(hourResponse);
    let coinData = {
      day: cleanDayCoin,
      hour: cleanHourCoin
    };
    return coinData;
  }
};