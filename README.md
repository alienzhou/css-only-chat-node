# CSS-only Chat (NodeJS)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) ![](https://img.shields.io/static/v1.svg?label=have&message=fun&color=orange)

> A truly monstrous async web chat using no JS whatsoever on the frontend.

![sample](./sample.gif)

This is a [NodeJS](https://nodejs.org) version for [@kkuchta/css-only-chat](https://github.com/kkuchta/css-only-chat) which is implemented by Ruby.

## What is it

CSS-only Chat is an asynchronous chat that sends + receives messages in the browser with no reloads and no javascript. This repository use all the tricks mentioned in css-only-chat to build a NodeJS version.

To make it simple, this repository uses an in-memory cache module (`cache.js` file) to replace Redis.

## How it works

- use pseudo-class `:active` to catch the click event
- use attribute `background-image` to send data
- use stream in the response to update the page without JavaScript

For more details, please visit [@kkuchta/css-only-chat](https://github.com/kkuchta/css-only-chat).

## How to run

No external dependency. Just need a NodeJS runtime.

Supposing you have [installed NodeJS](https://nodejs.org/en/download/), just run

```bash
npm start
```
