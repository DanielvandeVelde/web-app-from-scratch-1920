export let render = {
  check: () => {
    if (document.getElementsByTagName("main")[0]) {
      let main = document.getElementsByTagName("main")[0];
      document.body.removeChild(main);
    }
    if (!document.getElementsByTagName("nav")[0]) {
      render.navBar();
    }
  },
  overview: coins => {
    render.check();
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
    document.body.setAttribute("id", "overview");
  },
  detail: (cleanData, id) => {
    render.check();
    let main = document.createElement("main"),
      section = document.createElement("section"),
      mainheader = document.createElement("h1");
    mainheader.innerText = id;
    main.appendChild(mainheader);
    main.appendChild(section);
    document.body.appendChild(main);
    let mainElement = document.getElementsByTagName("main")[0];
    document.body.setAttribute("id", "detail");

    let dayData = cleanData[0],
      hourData = cleanData[1],
      weekData = dayData.slice(24, 31),
      monthData = dayData;

    render.dayChart(hourData);
    render.weekChart(weekData);
    render.monthChart(monthData);
  },
  dayChart: coin => {
    console.log(coin);
    let sectionElement = document.getElementsByTagName("section")[0],
      canvas = document.createElement("canvas"),
      dayHeader = document.createElement("h2");
    dayHeader.innerText = "Last 24 hours";
    sectionElement.appendChild(dayHeader);
    canvas.setAttribute("id", "dayCanvas");
    sectionElement.appendChild(canvas);
    let timeArray = coin.map(coin => {
      return coin.t;
    });
    let ctx = document.getElementById("dayCanvas").getContext("2d");
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
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

      // Configuration options go here
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
        ]
      }
    });
  },
  weekChart: coin => {
    let sectionElement = document.getElementsByTagName("section")[0],
      canvas = document.createElement("canvas"),
      weekHeader = document.createElement("h2");
    weekHeader.innerText = "Last 7 days";
    sectionElement.appendChild(weekHeader);
    canvas.setAttribute("id", "weekCanvas");
    sectionElement.appendChild(canvas);
    let timeArray = coin.map(coin => {
      return coin.t;
    });
    let ctx = document.getElementById("weekCanvas").getContext("2d");
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
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

      // Configuration options go here
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
        ]
      }
    });
  },
  monthChart: coin => {
    let sectionElement = document.getElementsByTagName("section")[0],
      canvas = document.createElement("canvas"),
      monthHeader = document.createElement("h2");
    monthHeader.innerText = "Last 30 days";
    sectionElement.appendChild(monthHeader);
    canvas.setAttribute("id", "monthCanvas");
    sectionElement.appendChild(canvas);
    let timeArray = coin.map(coin => {
      return coin.t;
    });
    let ctx = document.getElementById("monthCanvas").getContext("2d");
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
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

      // Configuration options go here
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
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
        ]
      }
    });
  },
  navBar: () => {
    let navbar = document.createElement("nav");

    let rawHTML = `<ul>
    <li><a href=""></a></li>
    <form><input type="text" placeholder="Ticker (e.g. BTC or ETH)"/></form></li><li><a href="">Winners</a></li><li><a href="">Losers</a></li><li></ul>`;

    navbar.insertAdjacentHTML("afterbegin", rawHTML);
    document.body.appendChild(navbar);
    let formElement = document.getElementsByTagName("form")[0];
    formElement.addEventListener("submit", e => {
      e.preventDefault();
      let inputValue = e.target[0].value;
      window.location.replace("#coin/" + inputValue);
    });
  }
};
