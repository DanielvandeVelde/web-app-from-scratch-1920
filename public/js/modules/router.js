import { api } from "./api.js";
import { data } from "./data.js";
import { render } from "./render.js";

export let router = routie({
  "": async () => {
    render.check();
    api.check(true);
  },
  top: async list => {
    render.check();
    api.check(false);
  },
  "coin/:coin": async coin => {
    render.check();
    let response = await api.getCoin(coin);
    await render.detail(response, coin);
  }
});

// Check what? More precise naming, I think
