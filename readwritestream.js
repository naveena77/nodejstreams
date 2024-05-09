//readstream and writestream example
const express = require("express");
var app = express();
const fs = require("fs");
// app.get("/", function (request, response) {
//   response.send("Hello world");
// });

// app.listen(4000, function () {
//   console.log("Started application on port %d", 4000);
// });
const main = async () => {
  const readStream = fs.createReadStream("./data/import.csv", {
    highWaterMark: 100,
  });

  const writeStream = fs.createWriteStream("./data/export.csv");

  readStream.on("data", (buffer) => {
    console.log(">>> DATA:");
    console.log(buffer.toString());
    writeStream.write(buffer);
  });

  readStream.on("end", () => {
    console.log("stream ended");
  });
};

main();
