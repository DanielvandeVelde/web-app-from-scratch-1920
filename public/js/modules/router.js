import { api } from "./api.js";
import { render } from "./render.js";

export let router = routie({
  "": () => {
    render.check();
    api.check(true);
  },
  top: list => {
    render.check();
    api.check(false);
  },
  "coin/:coin": coin => {
    render.check();
    api.getCoin(coin);
  }
});
