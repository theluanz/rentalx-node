import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { EnsureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { EnsureAdmin } from "../middlewares/ensureAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
  "/",
  EnsureAuthenticated,
  EnsureAdmin,
  createSpecificationController.handle
);

export { specificationRoutes };
