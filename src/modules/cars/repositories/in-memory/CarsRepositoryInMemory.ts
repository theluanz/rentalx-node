import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarsRepository } from "../ICarRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    category_id,
    license_plate,
    daily_rate,
    fine_amount,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      license_plate,
      daily_rate,
      fine_amount,
    });

    this.cars.push(car);
    return car;
  }
}

export { CarsRepositoryInMemory };
