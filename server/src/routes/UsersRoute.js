import { Router } from "express";
import UsersController from "../controllers/UsersController.js";

const UsersRouter = Router();

UsersRouter.get('/', async function (req, res, next) {
  try {
    res.json({
      ok: true,
      message: "Users"
    })
  } catch (e) {
    next(e);
  }
})

UsersRouter.post('/login', UsersController.UserLoginAccount)

export default {
  path: "/users",
  router: UsersRouter,
};