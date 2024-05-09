//memory leak if nore than the buffer size
//pipes helps to fix
const fs = require("fs");
const main = async () => {
  const readStream = fs.createReadStream("./data/import.csv");

  const writeStream = fs.createWriteStream("./data/export.csv");

  readStream.pipe(writeStream);

  readStream.on("end", () => {
    console.log("ReadStream is ended");
  });

  writeStream.on("finish", () => {
    console.log("WriteStream is finised");
  });
};

main();
