# Web App From Scratch @cmda-minor-web 1819

<kbd>![Shiny front-end](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/banner.png "Shiny front-end")</kbd>

## Demo

I've got a [demo](https://danielvandevelde.github.io/web-app-from-scratch-1920/) running on GitHub Pages.

## Table of contents

1. [Goal](#1-Goal)
2. [Installation](#2-Installation)
3. [Actors](#3-Actors)
4. [Interaction](#4-Interaction)
5. [API](#5-API)
6. [Data](#6-Data)
7. [Wishlist](#7-Wishlist)

## 1. Goal

Showing some data on an overview page which you can click on to then move to a detail page where you can see more.  
The data will be requested from an API, the javascript will be in modules and there will be some routing as well!

But most of all; making something that's actually usable and a cool portfolio project :-)

## 2. Installation

You can clone this repository and then run `index.html`.

`git clone https://github.com/danielvandevelde/web-app-from-scratch-1920.git`

I do advise using a live-server of some sort.

## 3. Actors

<kbd>![Actor Diagram](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/actor.svg?sanitize=true "Actor diagram")</kbd>

## 4. Interaction

<kbd>![Interaction diagram](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/Interaction.svg?sanitize=true "Interaction diagram")</kbd>

## 5. API

### Market data

I'm using the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/) for the market prices.
CoinMarketCap provides free developer accounts if you plan on using their basic plan.
The free plan is limited in [several ways](https://pro.coinmarketcap.com/features), the most important restrictions are:

- Daily 300 credits to make requests with
- 30 requests per minute (rate limit)
- Only access to a few endpoints and no historical data

To grab the data for the mainpage which is currently 50 different coins with their price and the percentage changes in the past week or so the API requires 1 credit.
This means in total I can request this data for the mainpage 300 times in a day before running out of credits.

I'm using their latest listings endpoint which has most of the big cryptocoins.

### Coin data

For the specific coin prices and historical data I'm using [CryptoCompare](https://min-api.cryptocompare.com/documentation)'s API.  
CryptoCompare is one of the few API's I could find that provides historical data for coins which I could use to make some more interesting detail pages.  
The free plan that they offer has various [limits](https://min-api.cryptocompare.com/pricing) of which the most important:

- 50.000 request a day limit
- 2.500 request a minute
- Full hourly and daily historical data
- Data for every minute for the past 7 days!

I'm using their daily and hourly history endpoints: histohour and histoday.

## 6. Data

### CryptoCompare history

<details>
 <summary>Example of data</summary>

```js
{
  Response: "Succes",
  Message: "", //Empty string
  HasWarning: false,
  Type: Number, //100
  Ratelimit: {}, //Empty object
  Data: {
    Aggregated: false,
    TimeFrom: Number, //Epoch
    TimeTo: Number, // Epoch
    Data: [
      i: {
        time: Number,
        high: Number,
        low: Number,
        open: Number,
        volumefrom: Number,
        volumeto: Number,
        close: Number,
        conversationType: "direct",
        conversionSumbol: "" //Empty string
      }
    ]
  }
}
```

</details>

### CoinMarketCap

<details>
<summary>Example of data</summary>

```js
{
  data: [
    i: {
      circulating_supply: Number,
      cmc_rank: Number, //CoinMarketCap ranking
      date_added: "", //ISO 8601
      id: Number, //Bitcoin = 1, etc.
      last_updated: "", //ISO 8601
      max_supply: Number,
      name: "Coin name", //e.g. Bitcoin, Ethereum, Litecoin
      num_market_pairs: Number,
      patform: null,
      quote: {
        EUR: {
          last_updated: "", //ISO 8601
          market_cap: Number,
          percent_change_1h: Number,
          percent_change_24h: Number,
          percent_change_7d: Number,
          price: Number,
          volume_24h: Number
        },
        volume_24: Number,
        percent_change_1h: Number
      },
      slug: "Coin name", //e.g. Bitcoin, Ethereum, Litecoin
      symbol: "ticker", //e.g. BTC, ETH, LTC
      tags: [ "minable"],
      total_supply: Number
    }
  ],
  status: {
  credit_count: Number, //Amount of credits used for request
  elapsed: Number, //Time in ms
  error_code Number, //0 if no errorcode
  error_message: null, //Unless there is one, then string.
  notice: null,
  timestamp: "",//ISO 8601
  }
}
```

</details>

## 7. Wishlist

Currently this is more a to-do list for the upcoming week :-)

- [x] Data
- [x] localStorage
- [x] Change to fetch[?](https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/)
- [x] Working routie (routes)
- [x] Searchbar
- [x] Detailspage, graphs & back button
- [x] Modules
- [x] Page for big winner/loser (using .filter())
- [ ] Update interaction + actor diagram
- [x] "loading state"
- [ ] Virtual DOM
- [ ] Errorhandler
- [ ] Actually making money from crypto
