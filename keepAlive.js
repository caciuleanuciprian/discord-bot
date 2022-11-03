const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send(`Server is up and running!`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is online! " + Date.now());
  });
}

module.exports = keepAlive;
