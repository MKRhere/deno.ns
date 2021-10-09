import * as globals from "./unstable.js";
// Adds WhatWG Streams to globalThis
import "./hacks/web-streams.js";

Object.assign(
  globalThis,
  Object.fromEntries(
    Object.entries(globals).filter(([k]) => !(k in globalThis))
  )
);
