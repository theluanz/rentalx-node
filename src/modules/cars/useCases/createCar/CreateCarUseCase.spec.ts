import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name Car",
      description: "Description Car",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
    });
    expect(car).toHaveProperty("id");
  });

  it("should NOT be able to create two cars with same license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description Car",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-1234",
      });
      await createCarUseCase.execute({
        name: "Car 2",
        description: "Description Car",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABD-1234",
    });
    expect(car.available).toBe(true);
  });
});
