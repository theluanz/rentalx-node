import { DataSource } from "typeorm";

const dataSource: DataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "rentx_db",
});
dataSource.initialize();
