import { boomify } from "@hapi/boom";
import { FastifyRequest, FastifyReply } from "fastify";
import * as fs from "fs";
import BigNumber from "bignumber.js";

//in km
const RADIUS_OF_THE_SUN = 696340;

export const calculateSunCircumference = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const piValue = fs.readFileSync("data/pi.txt", "utf8");
    res.send({
      circumference_of_the_sun: new BigNumber(RADIUS_OF_THE_SUN * 2).times(
        piValue
      ),
      pi: piValue,
    });
  } catch (err) {
    throw boomify(err);
  }
};
