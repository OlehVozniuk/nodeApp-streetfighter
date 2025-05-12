import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.data = users.length
        ? users
        : { error: true, message: "Користувачі не знайдені" };
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
      const user = await userService.getUserById(req.params.id);
      res.data = user || { error: true, message: "Користувача не знайдено" };
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
  createUserValid,
  async (req, res, next) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.data = newUser;
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
  updateUserValid,
  async (req, res, next) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.error = { status: 404, message: "Користувача не знайдено" };
      } else {
        res.data = updatedUser;
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
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.error = { status: 404, message: "Користувача не знайдено" };
      } else {
        res.data = deletedUser;
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
