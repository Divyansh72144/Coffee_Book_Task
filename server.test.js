const request = require("supertest");
const app = require("./server");
const Coffee = require("./models/coffee");

describe("GET /api/coffees", () => {
  it("should return a list of coffees", async () => {
    const response = await request(app).get("/api/coffees");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("strength");
    expect(response.body[0]).toHaveProperty("weight");
  });

  describe("POST /api/coffees", () => {
    it("should create a new coffee", async () => {
      const newCoffee = {
        name: "Test Coffee",
        weight: 200,
        price: 5.99,
        strength: 3,
      };

      const response = await request(app).post("/api/coffees").send(newCoffee);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(newCoffee.name);
      expect(response.body.weight).toBe(newCoffee.weight);
      expect(response.body.price).toBe(newCoffee.price);
      expect(response.body.strength).toBe(newCoffee.strength);
    });

    it("should return an error for missing fields", async () => {
      const invalidCoffee = {};

      const response = await request(app)
        .post("/api/coffees")
        .send(invalidCoffee);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Name, weight, price, and strength are required fields",
      });
    });
  });

  describe("DELETE /api/coffees/:id", () => {
    it("should delete a coffee by ID", async () => {
      const existingCoffee = await Coffee.findOne();
      const response = await request(app).delete(
        `/api/coffees/${existingCoffee.id}`
      );
      expect(response.status).toBe(204);
    });

    it("should return a 404 for a non-existent ID", async () => {
      const nonExistentId = "604f08381c9d440000000000"; //ID  doesn't exist
      const response = await request(app).delete(
        `/api/coffees/${nonExistentId}`
      );

      expect(response.status).toBe(404);
    });
  });
});
