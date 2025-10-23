import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for clients", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app)
      .post("/clients")
      .send({
        name: "Fulano de Tal",
        email: "email@email",
        document: "11122211155",
        addressStreet: "Rua xpto",
        addressNumber: "123",
        addressComplement: "Comp",
        addressCity: "Sao Paulo",
        addressState: "SP",
        addressZipCode: "01234-123",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Fulano de Tal");
    expect(response.body.email).toBe("email@email");
    expect(response.body.document).toBe("11122211155");
    expect(response.body.address._street).toBe("Rua xpto");
    expect(response.body.address._number).toBe("123");
    expect(response.body.address._complement).toBe("Comp");
    expect(response.body.address._city).toBe("Sao Paulo");
    expect(response.body.address._state).toBe("SP");
    expect(response.body.address._zipCode).toBe("01234-123");
  });

  it("should not create a client", async () => {
    const response = await request(app).post("/clients").send({
      name: "err",
    });
    expect(response.status).toBe(500);
  });

});
