function getMoney(req, url) {
  console.log("💰 Getting that money 💰");
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(req, url);
    request.onload = resolve;
    request.onerror = reject;
    request.send();
  });
}

routie("*", function() {
  wheresTheMoneyLebowski();
});

function wheresTheMoneyLebowski() {
  if (localStorage.getItem("cleanCash") === null) {
    getMoney(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=EUR&CMC_PRO_API_KEY=9a7aa090-0a69-4aca-8857-af28026f3b7e"
    )
      .then(function(e) {
        const data = JSON.parse(e.target.response);
        if (data.status.error_code) {
          console.log(data.status.error_code);
          errorHandler(data);
          return;
        }
        cleanTheMoney(data);
      })
      .catch(error => {
        errorHandler();
      });
    return;
  }

  let money = JSON.parse(localStorage.getItem("cleanCash"));
  showMeTheMoney(money);
}

function errorHandler(error) {
  console.log("🤷 ¯\\_(ツ)_/¯ 🤷");
  console.log(error);
}

function cleanTheMoney(data) {
  console.log("🛁 Laundering the money 🛁");

  const money = data.data.map(coin => {
    return {
      name: coin.name,
      abbreviation: coin.symbol,
      price: coin.quote.EUR.price,
      hour: coin.quote.EUR.percent_change_1h,
      day: coin.quote.EUR.percent_change_24h,
      week: coin.quote.EUR.percent_change_7d
    };
  });

  console.log("💸 Storing that money in the bank 💸");
  localStorage.setItem("cleanCash", JSON.stringify(money));
  showMeTheMoney(money);
}

function showMeTheMoney(money) {
  console.log("💲 Showing the money 💲");
  console.log(money);
}
