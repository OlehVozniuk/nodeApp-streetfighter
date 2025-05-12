import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const isGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
const isPhoneUA = (phone) => /^\+380\d{9}$/.test(phone);

const validateUserFields = (body, isCreate = true) => {
  const allowedKeys = Object.keys(USER).filter((key) => key !== "id");
  const bodyKeys = Object.keys(body);

  if ("id" in body) {
    return "Поле id не повинно бути присутнє в запиті.";
  }

  const extraKeys = bodyKeys.filter((key) => !allowedKeys.includes(key));
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

  if ("email" in body && !isGmail(body.email)) {
    return "Email повинен бути у форматі @gmail.com";
  }

  if ("phone" in body && !isPhoneUA(body.phone)) {
    return "Phone повинен бути у форматі +380xxxxxxxxx";
  }

  if (
    "password" in body &&
    (typeof body.password !== "string" || body.password.length < 4)
  ) {
    return "Password повинен містити щонайменше 4 символи.";
  }

  return null;
};
const checkEmailAndPhoneUnique = async (
  body,
  isCreate = true,
  userId = null
) => {
  if ("email" in body) {
    const user = await userService.getUser({ email: body.email });
    if (user && user.id !== userId) {
      return "Email вже використовується.";
    }
  }

  if ("phone" in body) {
    const user = await userService.getUser({ phone: body.phone });
    if (user && user.id !== userId) {
      return "Телефон вже використовується.";
    }
  }

  return null;
};
const createUserValid = async (req, res, next) => {
  const error = validateUserFields(req.body, true);
  if (error) {
    return res.status(400).json({ error: true, message: error });
  }

  const uniquenessError = await checkEmailAndPhoneUnique(req.body, true);
  if (uniquenessError) {
    return res.status(400).json({ error: true, message: uniquenessError });
  }

  next();
};

const updateUserValid = async (req, res, next) => {
  const error = validateUserFields(req.body, false);
  if (error) {
    return res.status(400).json({ error: true, message: error });
  }

  const userId = req.params.id;
  const uniquenessError = await checkEmailAndPhoneUnique(
    req.body,
    false,
    userId
  );
  if (uniquenessError) {
    return res.status(400).json({ error: true, message: uniquenessError });
  }

  next();
};

export { createUserValid, updateUserValid };
