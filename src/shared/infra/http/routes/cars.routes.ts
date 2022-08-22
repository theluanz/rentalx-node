import { Router } from "express";
import { EnsureAuthenticated } from "middlewares/ensureAuthenticated";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { EnsureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  EnsureAuthenticated,
  EnsureAdmin,
  createCarController.handle
);

export { carsRoutes };
