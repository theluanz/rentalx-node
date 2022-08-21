import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  // findByName(name: string): Promise<Cars>;
  // list(): Promise<Cars[]>;
  create(data: ICreateCarsDTO): Promise<Car>;
}

export { ICarsRepository };
