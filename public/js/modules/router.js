import { api } from "./api.js";
import { data } from "./data.js";
import { render } from "./render.js";

export let router = routie({
  "coin/:coin": function(coin) {
    // Specific coin, thus detailpage
    console.log("detail");
  },
  "": async function() {
    // If nothing then overview
    console.log("overview");

    if (localStorage.getItem("topCryptoCoins") === null) {
      console.log("There's nothing here");
      let response = await api.homepage();
      let coins = await data.fromStorage();
      let overview = render.main(coins);
    } else {
      let coins = await data.fromStorage();
      let overview = render.main(coins);
    }
  }
});
