# Web App From Scratch @cmda-minor-web 1819

<kbd>![Shiny front-end](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/banner.png "Shiny front-end")</kbd>

## Demo

Er is op GitHub Pages een [demo](https://danielvandevelde.github.io/web-app-from-scratch-1920/) beschikbaar.

## Table of contents

1. [Goal](#1-Goal)
2. [Actors](#2-Actors)
3. [API](#3-API)
4. [Interaction](#4-Interaction)
5. [Design Patterns](#Design-Patterns)
6. [Wishlist](#Wishlist)

## 1. Goal

## 2. Actors

## 3. API

I'm using the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/).
CoinMarketCap provides free developer accounts if you plan on using their basic plan.
The free plan is limited in [several ways](https://pro.coinmarketcap.com/features), the most important restrictions are:

- Daily 300 credits to make requests with
- 30 requests per minute (rate limit)
- Only access to a few endpoints and no historical data

To grab the data for the mainpage which is currently 50 different coins with their price and the percentage changes in the past week or so the API requires 1 credit.
This means in total I can request this data for the mainpage 300 times in a day before running out of credits.

## 4. Interaction

## 5. Design Patterns

## 6. Wishlist

- [x] Data
- [x] localStorage
- [ ] Details
- [ ] Loading state
- [ ] Maybe use routie? Although I like my current solution
- [ ] Actually making money from crypto
