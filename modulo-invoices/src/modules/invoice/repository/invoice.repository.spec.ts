import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceRepository from "./invoice.repository";
import Address from "../../@shared/domain/value-object/address";
import invoiceItems from "../domain/invoice-items";

describe("InvoiceRepository test", () => {
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

  it("should save a invoice", async () => {
    const myItems: invoiceItems[] = [];
    myItems.push(new invoiceItems({id: new Id("1"), name: "item1", price: 10.00}));
    myItems.push(new invoiceItems({id: new Id("2"), name: "item2", price: 20.00}));
    myItems.push(new invoiceItems({id: new Id("3"), name: "item3", price: 30.00}));
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Test",
      document: "test",
      address: new Address(
              "Rua 123",
              "99",
              "Casa Verde",
              "Criciúma",
              "SC",
              "88888-888",
            ),
        items: myItems
    });

    const repository = new InvoiceRepository();
    const result = await repository.save(invoice);

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.items.length).toBe(3);

  });

  it("should find a invoice", async () => {

    const myItems: invoiceItems[] = [];
    myItems.push(new invoiceItems({id: new Id("1"), name: "item1", price: 10.00}));
    myItems.push(new invoiceItems({id: new Id("2"), name: "item2", price: 20.00}));
    myItems.push(new invoiceItems({id: new Id("3"), name: "item3", price: 30.00}));
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Test",
      document: "test",
      address: new Address(
              "Rua 123",
              "99",
              "Casa Verde",
              "Criciúma",
              "SC",
              "88888-888",
            ),
        items: myItems
    });

    const repository = new InvoiceRepository();
    const result = await repository.save(invoice);
    const finded = await repository.find(result.id.id);

    expect(finded.id.id).toBe(invoice.id.id);
    expect(finded.name).toBe(invoice.name);
    expect(finded.document).toBe(invoice.document);
    expect(finded.items.length).toBe(3);

  });
});
