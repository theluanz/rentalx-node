import { Router } from "express";
import { EnsureAuthenticated } from "middlewares/ensureAuthenticated";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { EnsureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp/",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  "/",
  EnsureAuthenticated,
  EnsureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  EnsureAuthenticated,
  EnsureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
