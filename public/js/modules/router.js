import { api } from "./api.js";
import { render } from "./render.js";

export let router = routie({
  "": () => {
    render.removeMain();
    api.checkStorage(true);
  },
  top: list => {
    render.removeMain();
    api.checkStorage(false);
  },
  "coin/:coin": coin => {
    render.removeMain();
    api.getCoin(coin);
  }
});
