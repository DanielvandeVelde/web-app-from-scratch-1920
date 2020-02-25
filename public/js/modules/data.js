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
    overview ? render.overview(coins) : data.toplist(coins);
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
    overview ? render.overview(cleanData) : data.toplist(cleanData);
  },
  cleanCoin: (rawData, abbreviation) => {
    let dayData = rawData.day.Data.Data,
      hourData = rawData.hour.Data.Data;
    let allArray;

    let cleanDay = dayData.map(coin => {
      let price = (coin.high + coin.low) / 2;
      price = Number(price).toFixed(5);
      let time = new Date(coin.time * 1000).toLocaleDateString(undefined, {
        hour: "numeric",
        minute: "2-digit"
      });
      return {
        t: time,
        y: price
      };
    });

    let cleanHour = hourData.map(coin => {
      let price = (coin.high + coin.low) / 2;
      price = Number(price).toFixed(5);
      let time = new Date(coin.time * 1000).toLocaleDateString(undefined, {
        hour: "numeric",
        minute: "2-digit"
      });
      return {
        t: time,
        y: price
      };
    });

    let renderData = {
      hour: cleanHour,
      day: cleanDay,
      week: cleanDay.slice(24, 31)
    };

    render.detail(renderData, abbreviation);
  },
  toplist: cleanData => {
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

    render.toplist(minimum[0], maximum);
  }
};
