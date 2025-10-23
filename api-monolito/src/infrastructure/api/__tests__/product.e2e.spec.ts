import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Teclado",
        description: "Red dragon",
        purchasePrice: 10.01,
        stock: 1
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Teclado");
    expect(response.body.description).toBe("Red dragon");
    expect(response.body.purchasePrice).toBe(10.01);
    expect(response.body.stock).toBe(1);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/products").send({
      description: "xpto",
    });
    expect(response.status).toBe(500);
  });

});
