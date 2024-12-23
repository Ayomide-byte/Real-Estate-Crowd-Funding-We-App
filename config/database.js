import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
// MySQL connection using Sequelize
const databaseName = process.env.DATABASENAME;
const databaseUserName = process.env.DATABASEUSER;
const databasePassword = process.env.DATABASEPASS;
const sequelize = new Sequelize(
  databaseName,
  databaseUserName,
  databasePassword,
  {
    host: "127.0.0.1",
    dialect: "mysql", // Specifies the database dialect
  }
);

// Function to connect to MySQL
export const connectMySQL = async () => {
  try {
    await sequelize.authenticate(); // Tests the connection
    console.log("Connected to MySQL");
    await sequelize.sync(); // Ensures models are synced with the database
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
};

export default sequelize;
