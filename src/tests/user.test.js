import { jest } from "@jest/globals";
import request from "supertest";

/**
 * 1️⃣ Mock FIRST (before importing app)
 */
jest.unstable_mockModule("../repositories/user.repository.js", () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

/**
 * 2️⃣ Import mocked module
 */
const userRepo = await import("../repositories/user.repository.js");

/**
 * 3️⃣ Import app AFTER mocks
 */
const { default: app } = await import("../app.js");

describe("User API", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user successfully", async () => {
    userRepo.findUserByEmail.mockResolvedValue(null);
    userRepo.createUser.mockResolvedValue({
      id: 1,
      name: "Dipesh",
      email: "dipesh@gmail.com",
    });

    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Dipesh",
        email: "dipesh@gmail.com",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("dipesh@gmail.com");
  });

  it("should fail validation", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Di",
      });

    expect(res.statusCode).toBe(400);
  });

  it("should fail if user already exists", async () => {
    userRepo.findUserByEmail.mockResolvedValue({
      id: 1,
      email: "dipesh@gmail.com",
    });

    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Dipesh",
        email: "dipesh@gmail.com",
      });

    expect(res.statusCode).toBe(500); // ideally 409
  });
});
