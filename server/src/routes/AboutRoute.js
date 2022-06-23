import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const AboutRouter = Router();

AboutRouter.get("/", AuthMiddleware, async function (req, res, next) {
  try {
    res.json({
      ok: true,
      message: "Test Test"
    })
  } catch (e) {
    next(e);
  }
});

export default {
  path: "/about",
  router: AboutRouter,
};