import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const credentials = req.body;
      const data = authService.login(credentials);
      res.data = data;
    } catch (err) {
      res.err = { status: 401, message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
