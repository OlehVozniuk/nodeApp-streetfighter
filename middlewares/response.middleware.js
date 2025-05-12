const responseMiddleware = (req, res, next) => {
  if (res.data) {
    return res.status(200).json(res.data);
  }

  if (res.error) {
    const { status = 400, message } = res.error;
    return res.status(status).json({ error: true, message });
  }

  return res.status(404).json({ error: true, message: "Дані не знайдено" });
};

export { responseMiddleware };
