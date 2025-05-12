import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const fighters = await fighterService.getAllFighters();
      res.data = fighters.length
        ? fighters
        : { error: true, message: "Бійці не знайдені" };
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
      const fighter = await fighterService.getFighterById(req.params.id);
      res.data = fighter || { error: true, message: "Бійця не знайдено" };
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
  createFighterValid,
  async (req, res, next) => {
    try {
      const newFighter = await fighterService.createFighter(req.body);
      res.data = newFighter;
    } catch (err) {
      res.error = { message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
  updateFighterValid,
  async (req, res, next) => {
    try {
      const updatedFighter = await fighterService.updateFighter(
        req.params.id,
        req.body
      );
      if (!updatedFighter) {
        res.error = { status: 404, message: "Бійця не знайдено" };
      } else {
        res.data = updatedFighter;
      }
    } catch (err) {
      res.error = { message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const deletedFighter = await fighterService.deleteFighter(req.params.id);
      if (!deletedFighter) {
        res.error = { status: 404, message: "Бійця не знайдено" };
      } else {
        res.data = deletedFighter;
      }
    } catch (err) {
      res.error = { message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
