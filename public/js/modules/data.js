export let data = {
  toStorage: function(data) {
    console.log("Coins set in storage");
    //Maybe also set a date here?
    localStorage.setItem("topCryptoCoins", JSON.stringify(data));
  },
  fromStorage: function() {
    console.log("Coins out of storage");
    //Check date after grabbing them, maybe new request needed?
    let coins = JSON.parse(localStorage.getItem("topCryptoCoins"));
    return coins;
  },
  clean: function(data) {
    const cleanData = data.data.map(coin => {
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
    this.toStorage(cleanData);
  }
};
