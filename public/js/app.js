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
      "https://cors-anywhere.herokuapp.com/https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=EUR&CMC_PRO_API_KEY=9a7aa090-0a69-4aca-8857-af28026f3b7e"
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
      price: Number(coin.quote.EUR.price).toFixed(2),
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
    let listitem = `<li>
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
}
