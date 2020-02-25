export let render = {
  removeMain: () => {
    if (document.getElementsByTagName("main")[0]) {
      let main = document.getElementsByTagName("main")[0];
      document.body.removeChild(main);
    }
    if (!document.getElementsByTagName("nav")[0]) {
      render.navBar();
    }
  },
  overview: coins => {
    let main = document.createElement("main"),
      mainheader = document.createElement("h1"),
      rawHTML = "<ul class='coinlist'>";

    coins.map(coin => {
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
    document.body.setAttribute("id", "overview");
  },
  detail: (coin, id) => {
    let main = document.createElement("main"),
      section = document.createElement("section"),
      mainheader = document.createElement("h1");
    mainheader.innerText = id;
    main.appendChild(mainheader);
    main.appendChild(section);
    document.body.appendChild(main);
    let mainElement = document.getElementsByTagName("main")[0];
    document.body.setAttribute("id", "detail");

    render.chart(coin.hour, "24 hours", "day");
    render.chart(coin.week, "7 days", "week");
    render.chart(coin.day, "30 days", "month");
  },
  chart: (coin, time, id) => {
    let sectionElement = document.getElementsByTagName("section")[0],
      canvas = document.createElement("canvas"),
      canvasID = "canvas" + id,
      header = document.createElement("h2");
    header.innerText = "Last " + time;
    sectionElement.appendChild(header);
    canvas.setAttribute("id", canvasID);
    sectionElement.appendChild(canvas);
    let timeArray = coin.map(coin => {
      return coin.t;
    });
    let ctx = document.getElementById(canvasID).getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",

      data: {
        labels: timeArray,
        datasets: [
          {
            borderDash: [5, 5],
            pointRadius: 5,
            pointHoverRadius: 10,
            borderColor: "goldenrod",
            data: coin
          }
        ]
      },

      options: {
        legend: {
          display: false
        },
        xAxes: [
          {
            type: "time",
            distribution: "series",
            time: {
              unit: "day",
              displayFormats: {
                quarter: "MMM D"
              }
            },
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }
        ],
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value, index, values) {
                  return "€" + value;
                }
              }
            }
          ]
        }
      }
    });
  },
  navBar: () => {
    let navbar = document.createElement("nav");

    let rawHTML = `<ul>
    <li><a href="#"></a></li>
    <form><input type="text" placeholder="Ticker (e.g. BTC or ETH)"/></form></li><li><a href="#top">Best/worst</a></li></ul>`;

    navbar.insertAdjacentHTML("afterbegin", rawHTML);
    document.body.appendChild(navbar);
    let formElement = document.getElementsByTagName("form")[0];
    formElement.addEventListener("submit", e => {
      e.preventDefault();
      let inputValue = e.target[0].value;
      window.location.replace("#coin/" + inputValue);
    });
  },
  bestWorst: (minimum, maximum) => {
    let main = document.createElement("main"),
      mainheader = document.createElement("h1");
    mainheader.innerText = "Best and worst";
    let rawHTML = `<section class='pos'><a href="#coin/${maximum.abbreviation}">
        <h2>${maximum.name}</h2>
        <h3>${maximum.day}%</h3>
        <p>That's the best percentage gain in the last 24 hours. <br/>
        The price of ${maximum.name} is now: <span>€${maximum.price}</span>.</p>
      </a></section>
      <section class='neg'>
        <a href="#coin/${minimum.abbreviation}">
        <h2>${minimum.name}</h2>
        <h3>${minimum.day}%</h3>
        <p>That's the worst percentage loss in the last 24 hours. <br/>
        The price of ${minimum.name} is now: <span>€${minimum.price}</span>.</p>
      </a></section>`;

    main.appendChild(mainheader);
    main.insertAdjacentHTML("beforeend", rawHTML);
    document.body.appendChild(main);
    let mainElement = document.getElementsByTagName("main")[0];
    document.body.setAttribute("id", "toplist");
  }
};
