import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { EnsureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationRoutes.post(
  "/",
  EnsureAuthenticated,
  createSpecificationController.handle
);

export { specificationRoutes };
