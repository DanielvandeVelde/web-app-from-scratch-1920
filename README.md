# Web App From Scratch @cmda-minor-web 1819

<kbd>![Shiny front-end](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/banner.png "Shiny front-end")</kbd>

## Demo

I've got a [demo](https://danielvandevelde.github.io/web-app-from-scratch-1920/) running on GitHub Pages.

## Table of contents

1. [Goal](#1-Goal)
2. [Actors](#2-Actors)
3. [Interaction](#3-Interaction)
4. [API](#4-API)
5. [Wishlist](#5-Wishlist)

## 1. Goal

Showing some data on an overview page which you can click on to then move to a detail page where you can see more.  
The data will be requested from an API, the javascript will be in modules and there will be some routing as well!

But most of all; making something that's actually usable and a cool portfolio project :-)

## 2. Actors

<kbd>![Actor Diagram](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/actor.svg?sanitize=true "Actor diagram")</kbd>

## 3. Interaction

<kbd>![Interaction diagram](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/Interaction.svg?sanitize=true "Interaction diagram")</kbd>

## 4. API

### Market data

I'm using the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/) for the market prices.
CoinMarketCap provides free developer accounts if you plan on using their basic plan.
The free plan is limited in [several ways](https://pro.coinmarketcap.com/features), the most important restrictions are:

- Daily 300 credits to make requests with
- 30 requests per minute (rate limit)
- Only access to a few endpoints and no historical data

To grab the data for the mainpage which is currently 50 different coins with their price and the percentage changes in the past week or so the API requires 1 credit.
This means in total I can request this data for the mainpage 300 times in a day before running out of credits.

### Specific coin data

For the historical data of a specific coin I'm using [CryptoCompare](https://min-api.cryptocompare.com/).  
This is one of the few APIs I found that lets you call on specific coin data over a period of about a year without a need to pay for it.
I will probably switch over to this one in the long run since the `/top list` endpoint also provides the needed data for the overview but only for the past 24 hours.

## 5. Wishlist

Currently this is more a to-do list for the upcoming week :-)

- [x] Data
- [x] localStorage
- [x] semi-details
- [ ] Change to fetch[?](https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/)
- [ ] Searchbar
- [ ] Working routie (routes)
- [ ] Actual details page
- [ ] Modules
- [ ] Create graphs on detailspage
- [ ] Maybe find/use a single API?
- [ ] Loading state and/or skeleton
- [ ] Actually making money from crypto
