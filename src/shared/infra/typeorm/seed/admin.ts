import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { createConnection } from "../data-source";

async function create() {
  const connection = await createConnection("localhost");
  const id = uuid();
  const password = await hash("admin", 8);
  await connection.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license) VALUES 
    ('${id}', 'admin', 'admin@admin', '${password}', true, 'now()', 'XXX')
  `);
  await connection.destroy();
}

create().then(() => console.log("Admin created"));
