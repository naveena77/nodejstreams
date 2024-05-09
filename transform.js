const fs = require("fs");
const csv = require("csvtojson");
const { Transform } = require("stream");

const main = async () => {
  const readStream = fs.createReadStream("./data/import.csv");

  const writeStream = fs.createWriteStream("./data/export.csv");

  const myTransform = new Transform({
    objectMode: true,
    transform(chunk, enc, callback) {
      const user = {
        name: chunk.name,
        email: chunk.email.toLowerCase(),
        age: Number(chunk.age),
        salary: Number(chunk.salary),
        isActive: chunk.isActive === "true",
      };
      callback(null, user);
    },
  });

  const filterUserActive = new Transform({
    objectMode: true,
    transform(user, enc, callback) {
      if (!user.isActive) {
        callback(null);
        return;
      }
      callback(null, user);
    },
  });
  readStream
    .pipe(
      csv(
        {
          delimiter: ";",
        },
        { objectMode: true }
      )
    )
    .pipe(myTransform)
    .pipe(filterUserActive)
    .on("data", (data) => {
      console.log(data);
    })
    .on("error", (error) => {
      console.log("some error", error);
    })
    .on("end", () => {
      console.log("stream is ended");
    });
};

main();
