import { Repository } from "typeorm";

import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarRepository";
import AppDataSource from "@shared/infra/typeorm/data-source";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    console.log(license_plate);
    const car = await this.repository.findOne({
      where: { license_plate },
    });
    console.log(car);

    return car;
  }
}
export { CarsRepository };
