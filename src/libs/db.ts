import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL || "", {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
});

sequelize.sync(); // Sync all models with the database

export default sequelize;
