import { api } from "./api.js";
import { data } from "./data.js";
import { render } from "./render.js";

export let router = routie({
  "": async () => {
    // Standard overview but not on wrong routes so no: '*'
    if (localStorage.getItem("topCryptoCoins") === null) {
      // Make api call, wait for the data to be cleaned and sent back and then push to render
      let response = await api.getMarket();
      await render.overview(response);
    } else {
      // Grab data from storage and push to render
      let coins = await data.fromStorage();
      await render.overview(coins);
    }
  },
  "coin/:coin": async coin => {
    let response = await api.getCoin(coin);
    await render.detail(response, coin);
  }
});
