import { FIGHTER } from "../models/fighter.js";
const validateFighterFields = (body, isCreate = true) => {
  const allowedKeys = Object.keys(FIGHTER).filter(
    (key) => key !== "id" && key !== "health"
  );
  const optionalKeys = ["health"];
  const bodyKeys = Object.keys(body);

  if ("id" in body) {
    return "Поле id не повинно бути присутнє в запиті.";
  }

  const allAllowedKeys = [...allowedKeys, ...optionalKeys];
  const extraKeys = bodyKeys.filter((key) => !allAllowedKeys.includes(key));
  if (extraKeys.length) {
    return `Знайдено недопустимі поля: ${extraKeys.join(", ")}`;
  }

  if (isCreate) {
    const missingKeys = allowedKeys.filter((key) => !bodyKeys.includes(key));
    if (missingKeys.length) {
      return `Відсутні обов’язкові поля: ${missingKeys.join(", ")}`;
    }
  } else {
    if (bodyKeys.length === 0) {
      return "Необхідно вказати хоча б одне поле для оновлення.";
    }
  }

  if ("power" in body) {
    if (typeof body.power !== "number" || body.power < 1 || body.power > 100) {
      return "Power повинен бути числом в діапазоні 1-100.";
    }
  }

  if ("defense" in body) {
    if (
      typeof body.defense !== "number" ||
      body.defense < 1 ||
      body.defense > 10
    ) {
      return "Defense повинен бути числом в діапазоні 1-10.";
    }
  }

  if ("health" in body) {
    if (
      typeof body.health !== "number" ||
      body.health < 80 ||
      body.health > 120
    ) {
      return "Health повинен бути числом в діапазоні 80-120.";
    }
  }

  return null;
};

const createFighterValid = (req, res, next) => {
  const error = validateFighterFields(req.body, true);
  if (error) {
    return res.status(400).json({ error: true, message: error });
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  const error = validateFighterFields(req.body, false);
  if (error) {
    return res.status(400).json({ error: true, message: error });
  }
  next();
};

export { createFighterValid, updateFighterValid };
