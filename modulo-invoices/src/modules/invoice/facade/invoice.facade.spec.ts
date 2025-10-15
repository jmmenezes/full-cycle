import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemsModel from "../repository/invoice-items.model";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {

    const facade = InvoiceFacadeFactory.create();

    const myItems: Array<{ id: string; name: string; price: number }> = [];

    myItems.push({ id: "1", name: "item1", price: 10.00 });
    myItems.push({ id: "2", name: "item2", price: 20.00 });
    myItems.push({ id: "3", name: "item3", price: 30.00 });

    const input = {
      name: "name",
      document: "doc",
      street: "street",
      number:  "number",
      complement:  "comp",
      city:  "city",
      state:  "state",
      zipCode:  "01234-123",
      items: myItems
    };

    const output = await facade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.items.length).toBe(input.items.length);
  });

  it("should find a invoice", async () => {

    const facade = InvoiceFacadeFactory.create();

    const myItems: Array<{ id: string; name: string; price: number }> = [];

    myItems.push({ id: "1", name: "item1", price: 10.00 });
    myItems.push({ id: "2", name: "item2", price: 20.00 });
    myItems.push({ id: "3", name: "item3", price: 30.00 });

    const input = {
      name: "name",
      document: "doc",
      street: "street",
      number:  "number",
      complement:  "comp",
      city:  "city",
      state:  "state",
      zipCode:  "01234-123",
      items: myItems
    };

    const created = await facade.generate(input);
    const output = await facade.find({
        id: created.id
    });

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.address.street).toBe(input.street);
    expect(output.items.length).toBe(input.items.length);
  });
});
