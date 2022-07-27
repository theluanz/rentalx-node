import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationRoutes.post(
  "/",
  EnsureAuthenticated,
  createSpecificationController.handle
);

export { specificationRoutes };
