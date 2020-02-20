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

routie({
  "coin/:coin": function(coin) {
    getSpecificCoin(coin);
  },
  "": function() {
    wheresTheMoneyLebowski();
  }
});

function wheresTheMoneyLebowski() {
  if (localStorage.getItem("cleanCash") === null) {
    let key = "4921adba-8213-4159-950e-35edf261684a";
    let currency = "EUR";
    let cors = "https://cors-anywhere.herokuapp.com/";
    let limit = "50"; //Limit to the amount of coins I'm requesting
    let api =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1";
    let url = `${cors}${api}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;

    getMoney("GET", url)
      .then(e => {
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
  console.log(data);
  console.log("🛁 Laundering the money 🛁");

  const money = data.data.map(coin => {
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

  console.log("💸 Storing that money in the bank 💸");
  localStorage.setItem("cleanCash", JSON.stringify(money));
  showMeTheMoney(money);
}

function showMeTheMoney(money) {
  console.log("💲 Showing the money 💲");
  if (document.body.children[1].id === "overview") {
    console.log("removing main");
    document.removeChild(document.body.children[2]);
  }

  let main = document.createElement("main"),
    mainheader = document.createElement("h1"),
    rawHTML = "<ul class='coinlist'>";

  money.forEach(coin => {
    let listitem = `<li>
      <a href="#coin/${coin.abbreviation}">
      <ul class="coin">
      <h2><span>${coin.abbreviation}</span>${coin.name}</h2>
      <h3><span>price</span>€${coin.price}</h3>
      <ul class="percentage">
        <li class=${coin.hour > 0 ? "pos" : "neg"}><span>hour</span>${
      coin.hour
    }%</li>
        <li class=${coin.day > 0 ? "pos" : "neg"}><span>day</span>${
      coin.day
    }%</li>
        <li class=${coin.week > 0 ? "pos" : "neg"}><span>week</span>${
      coin.week
    }%</li>
      </ul>
      </ul>
      </a>
    </li>`;

    rawHTML += listitem;
  });

  rawHTML += "</ul>";

  mainheader.innerText = "Cryptocurrency";
  main.appendChild(mainheader);
  main.insertAdjacentHTML("afterbegin", rawHTML);
  document.body.appendChild(main);
  let mainElement = document.body.children[2];
  mainElement.setAttribute("id", "overview");
}

function getSpecificCoin(id) {
  let key = "9d6d39b44ce2c90274169966fe79fe681cc7e97016d062449ebaa6631e17758e";
  let currency = "EUR";
  let coin = id;
  let time = "7"; //Amount of data being sent. CUrrently 7 for 7 days of the week.
  let url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=${currency}&limit=${time}&api-key=${key}`;

  getMoney("GET", url)
    .then(e => {
      const data = JSON.parse(e.target.response);
      makeDetail(coin, data.Data.Data);
    })
    .catch(error => {
      errorHandler();
    });
}

function makeDetail(coin, data) {
  console.log("hey");
  if (document.body.children[2].id === "overview") {
    let mainElement = getElementById("overview");
    document.body.removeChild(mainElement);
  }
}

/*
function buildCanvas(coin, data) {
  //Dit is een map geschreven als een reduce
  let timeArray2 = data.reduce(function(acc, datapoint) {
    let time = new Date(datapoint.time * 1000).toISOString();
    acc.push(time);
    return acc;
  }, []);

  let priceArray = data.map(function(data) {
    let price = (data.high + data.low) / 2;
    price = Number(price).toFixed(5);
    return price;
  });

  let allArray = data.map(function(data) {
    let price = (data.high + data.low) / 2;
    price = Number(price).toFixed(5);
    let time = new Date(data.time * 1000).toISOString();

    return {
      t: time,
      y: price
    };
  });
}
*/
