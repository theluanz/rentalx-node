import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "rentx_db",
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
