import { Sequelize } from "sequelize"
import DotEnv from "dotenv"
import UsersModel from "../models/UsersModel.js"
import UserSessionsModel from "../models/UsersSessionsModel.js";
import Relations from "../models/Relations.js";
import { createNewHash } from "../modules/bcypt.js"

DotEnv.config()

// assign postgres url from env file
const DB_URL = process.env.PG_CONNECTION_URL

if (!DB_URL)
  throw new Error("PG CONNECTION STRING IS NOT FOUND!")

// connect postgres with sequelize orm
const sequelize = new Sequelize(DB_URL, {
  logging: false
})

export default async function pg() {
  try {
    await sequelize.authenticate();

    // create database object
    let db = {}
    db.users = await UsersModel(sequelize, Sequelize)
    db.users_sessions = await UserSessionsModel(sequelize, Sequelize)

    // Declare relations between tables
    await Relations(db)

    // Create initial values if doesn't exist
    let initialData = [
      { user_login: "john", user_password: "123", user_name: "John Snow" },
      { user_login: "pink", user_password: "qwerty", user_name: "Pink Floyd" },
      { user_login: "tom", user_password: "admin", user_name: "Tom Cruise" },
    ]

    for(let data of initialData) {
      await db.users.findOrCreate({
        where: {
          user_login: data.user_login
        },
        defaults: {
          user_login: data.user_login,
          user_password: await createNewHash(data.user_password),
          user_name: data.user_name
        }
      })
    }

    // connect
    await sequelize.sync({ force: false })

    return db;
  } catch (e) {
    console.log("SQL_ERROR:", e)
  }
}