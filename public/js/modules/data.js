import { render } from "./render.js";

export let data = {
  toStorage: rawData => {
    console.log("Coins set in storage");
    //Maybe also set a date here with Date.now()
    localStorage.setItem("topCryptoCoins", JSON.stringify(rawData));
  },
  fromStorage: () => {
    console.log("Coins out of storage");
    let coins = JSON.parse(localStorage.getItem("topCryptoCoins"));
    /*
    if((Date.now() - coins.time) / 1000 / 60 > 30) {
      //Check if older than 30 minutes
    }
    */
    return coins;
  },
  cleanMarket: rawData => {
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
    return cleanData;
  },
  cleanCoin: rawData => {
    let dataStuff = rawData.Data.Data;
    let allArray;

    allArray = dataStuff.map(coin => {
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
    return allArray;
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
