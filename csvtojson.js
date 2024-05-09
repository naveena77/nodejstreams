const fs = require("fs");
const csv = require("csvtojson");

const main = async () => {
  const readStream = fs.createReadStream("./data/import.csv");

  const writeStream = fs.createWriteStream("./data/export.csv");

  readStream
    .pipe(
      csv(
        {
          delimiter: ";",
        },
        { objectMode: true }
      )
    )
    .on("data", (data) => {
      console.log(data);
    });
};

main();
