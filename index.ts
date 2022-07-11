import fastify from "fastify";
import * as path from "path";
import * as fs from "fs";
import config from "./config/config";
import generatePi from "./utils/generatePi";
import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";
import cors from "@fastify/cors";

const server = fastify({
  logger: true,
});

const prepareRoutes = (dirPath: string) => {
  //load routes
  fs.readdirSync(dirPath).forEach((file) => {
    const absFile = `${dirPath}/${file}`;
    const stat = fs.statSync(absFile);

    if (stat && stat.isDirectory()) {
      prepareRoutes(absFile);
    } else {
      const route = require(absFile).default;
      route.forEach((r) => {
        server.route(r);
      });
    }
  });
};

const routePath = path.resolve(__dirname, "routes");

const start = async () => {
  try {
    prepareRoutes(routePath);
    const _origin = ["http://localhost:3000"];

    server.register(cors, {
      origin: _origin,
    });
    await server.listen(config.port);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();

const scheduler = new ToadScheduler();
const task = new Task("calculate pi to increasing accuracy", async () => {
  // read from text file
  const piPointerFilePath = "data/pi_pointer.txt";

  // create file if it doesn't exist
  if (!fs.existsSync(piPointerFilePath)) {
    //create data directory if it doesn't exist
    if (!fs.existsSync("data")) {
      await fs.mkdirSync("data");
    }
    await fs.writeFileSync(piPointerFilePath, "0");
  }

  // read from file
  const piPointer = fs.readFileSync(piPointerFilePath, "utf8");

  const newCounterValue = Number(piPointer) + 1 || 0;
  let newPiValue = generatePi(newCounterValue);

  if (newCounterValue < 7) {
    newPiValue = Number(newPiValue).toFixed(newCounterValue);
  }
  fs.writeFileSync(piPointerFilePath, newCounterValue.toString());
  fs.writeFileSync(path.resolve(__dirname, "data/pi.txt"), newPiValue);
});

//run task every 5 seconds
const job = new SimpleIntervalJob({ seconds: 5 }, task);

scheduler.addSimpleIntervalJob(job);
