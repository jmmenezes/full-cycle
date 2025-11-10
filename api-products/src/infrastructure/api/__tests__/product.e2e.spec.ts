import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Prod1",
        price: 12.12,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Prod1");
    expect(response.body.price).toBe(12.12);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Prod1",
        price: 12.12,
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Prod2",
        price: 13.13,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const customer = listResponse.body.products[0];
    expect(customer.name).toBe("Prod1");
    const customer2 = listResponse.body.products[1];
    expect(customer2.name).toBe("Prod2");

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Prod1</name>`);
    expect(listResponseXML.text).toContain(`<name>Prod2</name>`);
    expect(listResponseXML.text).toContain(`</product>`);

  });
});
