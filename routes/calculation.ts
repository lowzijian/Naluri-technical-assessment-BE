import { RouteOptions } from "fastify/types/route";
import { calculateSunCircumference } from "../controllers/calculation";

const calculationRoutes: RouteOptions[] = [
  {
    method: "GET",
    url: "/api/calculate_sun_circumference",
    handler: calculateSunCircumference,
  },
];

export default calculationRoutes;
