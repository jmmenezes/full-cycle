import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should checkout", async () => {
    const client = await request(app)
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

    expect(client.status).toBe(200);
    expect(client.body.name).toBe("Fulano de Tal");
    expect(client.body.email).toBe("email@email");
    expect(client.body.document).toBe("11122211155");
    expect(client.body.address._street).toBe("Rua xpto");
    expect(client.body.address._number).toBe("123");
    expect(client.body.address._complement).toBe("Comp");
    expect(client.body.address._city).toBe("Sao Paulo");
    expect(client.body.address._state).toBe("SP");
    expect(client.body.address._zipCode).toBe("01234-123");

    const prod1 = await request(app)
      .post("/products")
      .send({
        name: "Teclado",
        description: "Red dragon",
        purchasePrice: 10.01,
        stock: 1
      });

    expect(prod1.status).toBe(200);
    expect(prod1.body.name).toBe("Teclado");
    expect(prod1.body.description).toBe("Red dragon");
    expect(prod1.body.purchasePrice).toBe(10.01);
    expect(prod1.body.stock).toBe(1);

    const prod2 = await request(app)
      .post("/products")
      .send({
        name: "Mouse",
        description: "Microsoft",
        purchasePrice: 20.02,
        stock: 2
      });

    expect(prod2.status).toBe(200);
    expect(prod2.body.name).toBe("Mouse");
    expect(prod2.body.description).toBe("Microsoft");
    expect(prod2.body.purchasePrice).toBe(20.02);
    expect(prod2.body.stock).toBe(2);

    const placeOrderInputDto = {
      clientId: client.body.id,
      products: new Array({ productId: prod1.body.id}, {productId: prod2.body.id})
    }

    const response = await request(app)
      .post("/checkout")
      .send(placeOrderInputDto);

    expect(response.status).toBe(200);

  });

  it("should not checkout", async () => {
    const response = await request(app).post("/checkout").send({
      clientId: 123,
    });
    expect(response.status).toBe(500);
  });

});
