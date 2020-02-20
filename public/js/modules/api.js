import { data } from "./data.js";

export let api = {
  homepage: async () => {
    console.log("getting the data");
    let key = "4921adba-8213-4159-950e-35edf261684a";
    let currency = "EUR";
    let cors = "https://cors-anywhere.herokuapp.com/";
    let limit = "50"; //Limit to the amount of coins I'm requesting
    let api =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1";
    let url = `${cors}${api}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;

    let response = await fetch(url);
    response = await response.json();
    await data.clean(response);
  },
  detail: () => {}
};
