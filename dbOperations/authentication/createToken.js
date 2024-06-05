import errorHandler from "../helper/errorHandler.js";
import jwt from "jsonwebtoken";

export const createToken = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).send({ message: "Payload is required" });
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
    res.status(200).send(token);
  } catch (err) {
    errorHandler(err, res);
  }
};
