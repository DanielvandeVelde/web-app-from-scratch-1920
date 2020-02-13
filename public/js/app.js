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

function wheresTheMoneyLebowski() {
  if (localStorage.getItem("cleanCash") === null) {
    getMoney(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=EUR&CMC_PRO_API_KEY=4921adba-8213-4159-950e-35edf261684a"
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

  let main = document.createElement("main"),
    mainheader = document.createElement("h1"),
    rawHTML = "<ul class='coinlist'>";

  money.forEach(coin => {
    let listitem = `<li id="${coin.abbreviation}">
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
    </li>`;

    rawHTML += listitem;
  });

  rawHTML += "</ul>";

  mainheader.innerText = "Cryptocurrency";
  main.appendChild(mainheader);
  main.insertAdjacentHTML("beforeend", rawHTML);
  document.body.appendChild(main);

  let coinlist = document.getElementsByClassName("coinlist")[0].children;
  for (let i = 0; i < coinlist.length; i++) {
    let id = coinlist[i].id;
    coinlist[i].addEventListener("click", function(e) {
      clickCash(i, id);
    });
  }
}

function clickCash(i, id) {
  let coinElement = document.getElementById(id);
  if (coinElement.className === "open") {
    console.log("closing " + id);
    coinElement.classList.toggle("open");
    let coinCanvas = document.getElementById(id + "Canvas");
    coinCanvas.parentNode.removeChild(coinCanvas);
    return;
  }

  console.log("opening " + id);
  coinElement.classList.toggle("open");
  getSpecificCoin(id);
}

function getSpecificCoin(coin) {
  getMoney(
    "GET",
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=EUR&limit=7&api-key=9d6d39b44ce2c90274169966fe79fe681cc7e97016d062449ebaa6631e17758e`
  )
    .then(function(e) {
      const data = JSON.parse(e.target.response);
      buildCanvas(coin, data.Data.Data);
    })
    .catch(error => {
      errorHandler();
    });
}

function buildCanvas(coin, data) {
  let coinli = document.getElementById(coin);
  let coinCanvas = document.createElement("canvas");
  coinCanvas.setAttribute("id", coin + "Canvas");
  coinli.parentElement.insertBefore(coinCanvas, coinli.nextSibling);

  let timeArray = data.map(function(data) {
    let time = new Date(data.time * 1000).toISOString();
    return time;
  });

  let priceArray = data.map(function(data) {
    let price = (data.high + data.low) / 2;
    price = Number(price).toFixed(5);
    return price;
  });
  console.log(data);
  let allArray = data.map(function(data) {
    let price = (data.high + data.low) / 2;
    price = Number(price).toFixed(5);
    let time = new Date(data.time * 1000).toISOString();

    return {
      t: time,
      y: price
    };
  });

  console.log(timeArray);
  console.log(priceArray);
  console.log(allArray);

  let ctx = document.getElementById(coin + "Canvas");
}

wheresTheMoneyLebowski();
