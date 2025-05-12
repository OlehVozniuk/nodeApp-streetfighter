import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const fights = await fightersService.getAllFights();
      res.data = fights;
    } catch (err) {
      res.error = { message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const fight = await fightersService.getFightById(req.params.id);
      if (!fight) {
        res.error = { status: 404, message: "Битву не знайдено" };
      } else {
        res.data = fight;
      }
    } catch (err) {
      res.error = { message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  async (req, res, next) => {
    try {
      const { fighter1Id, fighter2Id } = req.body;
      const result = await fightersService.createFight(fighter1Id, fighter2Id);
      res.data = result;
    } catch (err) {
      console.error("Error in POST /fights:", err);
      res.error = { message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
