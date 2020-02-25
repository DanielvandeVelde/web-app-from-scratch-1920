import { render } from "./render.js";

export let data = {
  toStorage: rawData => {
    console.log("Coins set in storage");
    //Maybe also set a date here with Date.now()
    localStorage.setItem("topCryptoCoins", JSON.stringify(rawData));
  },
  fromStorage: overview => {
    console.log("Coins out of storage");
    let coins = JSON.parse(localStorage.getItem("topCryptoCoins"));
    overview ? render.overview(coins) : data.bestWorst(coins);
  },
  cleanMarket: (rawData, overview) => {
    const cleanData = rawData.data.map(coin => {
      let price = Number(coin.quote.EUR.price).toFixed(2);
      price = price.replace(".", ",");
      price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

      return {
        name: coin.name,
        abbreviation: coin.symbol,
        price: price,
        hour: Number(coin.quote.EUR.percent_change_1h).toFixed(2),
        day: Number(coin.quote.EUR.percent_change_24h).toFixed(2),
        week: Number(coin.quote.EUR.percent_change_7d).toFixed(2)
      };
    });
    data.toStorage(cleanData);
    overview ? render.overview(cleanData) : data.bestWorst(cleanData);
  },
  createGraphPoints: (cleanedData, options) => {
    let graphData = cleanedData.map(coin => {
      let price = (coin.high + coin.low) / 2;
      price = Number(price).toFixed(5);
      let time = new Date(coin.time * 1000).toLocaleDateString(
        undefined,
        options
      );
      return {
        t: time,
        y: price
      };
    });
    return graphData;
  },
  cleanCoin: (rawData, abbreviation) => {
    let dayData = rawData.day.Data.Data,
      hourData = rawData.hour.Data.Data,
      hourOptions = {
        hour: "numeric",
        minute: "2-digit"
      };

    let graphData = {
      hour: data.createGraphPoints(hourData, hourOptions),
      day: data.createGraphPoints(dayData),
      week: data.createGraphPoints(dayData).slice(24, 31)
    };

    render.detail(graphData, abbreviation);
  },
  bestWorst: cleanData => {
    //Without curly brackets
    let maximum = cleanData.reduce((max, coin) =>
      max.day > coin.day ? max : coin
    );

    //And a different way so I can show off .filter()
    let minimumValue = cleanData.reduce((min, coin) => {
      return Math.min(coin.day, min);
    }, Infinity);
    let minimum = cleanData.filter(coin => {
      return coin.day == minimumValue;
    });

    render.bestWorst(minimum[0], maximum);
  }
};
