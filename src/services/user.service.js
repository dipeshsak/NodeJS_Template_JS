import * as userRepo from "../repositories/user.repository.js";

export const registerUser = async (data) => {
  const existingUser = await userRepo.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  return await userRepo.createUser(data);
};
