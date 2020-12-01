import { createConnection } from 'typeorm'
export const connect = async () => {
  const conenction = await createConnection({
    type: 'postgres',
    username: "postgres",
    password: "",
    database: "postgres",
    port: 5432,
    synchronize: false,
    logging: true,
    migrationsTableName: "custom_migration_table",
    entities: [
        __dirname + '/models/*.js'
    ],
    migrations: [
        __dirname + '/migrations/*.js'
    ],
    cli: {
        entitiesDir: __dirname + "/models/",
        migrationsDir: __dirname + '/migrations/'
    }
  })
}