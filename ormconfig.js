const config = require('config')

module.exports = [
  {
    name: 'mysql-connection',
    type: 'mysql',
    host: config.get("App.database.mysql.host"),
    port: config.get("App.database.mysql.port"),
    username: config.get("App.database.mysql.username"),
    password: config.get("App.database.mysql.password"),
    database: config.get("App.database.mysql.database"),
    synchronize: true,
    logging: false,
    entities: [`dist/src/entity/mysql/*.js`],
  },
  {
    name: 'postgresql-connection',
    type: 'postgres',
    host: config.get("App.database.postgres.host"),
    port: config.get("App.database.postgres.port"),
    username: config.get("App.database.postgres.username"),
    password: config.get("App.database.postgres.password"),
    database: config.get("App.database.postgres.database"),
    synchronize: true,
    logging: false,
    entities: [`dist/src/entity/pg/*.js`],
  },
]
