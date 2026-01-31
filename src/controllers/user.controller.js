import * as userService from "../services/user.service.js";
import { toUserResponseDTO } from "../dtos/user.dto.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(toUserResponseDTO(user));
  } catch (err) {
    next(err);
  }
};
