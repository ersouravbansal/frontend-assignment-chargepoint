import { EventEmitter } from "events";
import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { Writable } from "stream";

class Broadcaster extends EventEmitter {
  constructor() {
    super();
    this.broadcasting = false;
  }

  start() {
    this.broadcasting = true;
    const broadcast = () => {
      console.log("Broadcasting...");
      const fileStream = fs.createReadStream("./meta/route.csv");

      fileStream
        .pipe(csvParse({ delimiter: ",", columns: true, cast: true }))
        .pipe(
          new Writable({
            objectMode: true,
            write: (obj, enc, cb) => {
              if (!this.broadcasting) return cb();

              setTimeout(() => {
                this.emit("data", obj);
                cb();
              }, Math.ceil(Math.random() * 150));
            },
          })
        )
        .once("finish", () => {
          console.log("Finished broadcasting");
          if (this.broadcasting) {
            console.log("Re-broadcast");
            broadcast();
          } else {
            console.log("Stopped broadcast");
          }
        });
    };
    broadcast();
  }

  end() {
    this.broadcasting = false;
  }
}

export default Broadcaster;
