const request = require("supertest");
const app = require("../src/server/index");

describe("Test the /analyze endpoint", () => {
  test("POST /analyze should return 400 if city or date is missing", async () => {
    const response = await request(app)
      .post("/analyze")
      .send({ city: "", date: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toHaveProperty(
      "msg",
      "City and date are required"
    );
  });
});
