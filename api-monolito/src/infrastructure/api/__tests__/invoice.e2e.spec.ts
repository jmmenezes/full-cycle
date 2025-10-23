import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for invoices", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should get a invoices", async () => {
    const response = await request(app)
      .post("/invoice")
      .send({
        name: "Nome do fulano",
        document: "11122211155",
        street: "Rua das dores",
        number: "123",
        complement: "Comp",
        city: "Sao Paulo",
        state: "SP",
        zipCode: "012345",
        items: new Array({
          id: 123,
          name: "prod",
          price: 123.45
        })
      });

    expect(response.status).toBe(200);
    
    const getInvoice = await request(app)
      .get("/invoice")
      .send({
        id: response.body.id
      });

    expect(getInvoice.status).toBe(200);
    expect(getInvoice.body.name).toBe("Nome do fulano");

  });

  it("should not get a invoice", async () => {
    const response = await request(app).get("/invoice").send({
      id: "aaa",
    });
    expect(response.status).toBe(500);
  });

});
