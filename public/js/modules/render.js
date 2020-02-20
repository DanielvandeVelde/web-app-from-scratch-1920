export let render = {
  main: function(coins) {
    let main = document.createElement("main"),
      mainheader = document.createElement("h1"),
      rawHTML = "<ul class='coinlist'>";

    coins.forEach(coin => {
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
    main.insertAdjacentHTML("beforeend", rawHTML);
    document.body.appendChild(main);
    let mainElement = document.getElementsByTagName("main")[0];
    mainElement.setAttribute("id", "overview");
  }
};
