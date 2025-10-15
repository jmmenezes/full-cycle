import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import invoiceItems from "../domain/invoice-items";
import FindInvoiceUseCase from "./find-invoice.usecase";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

  const myItems: invoiceItems[] = [];
  myItems.push(new invoiceItems({id: new Id("1"), name: "item1", price: 10.00}));
  myItems.push(new invoiceItems({id: new Id("2"), name: "item2", price: 20.00}));
  myItems.push(new invoiceItems({id: new Id("3"), name: "item3", price: 30.00}));

  const invoice = new Invoice({
    id: new Id("1"),
    name: "name",
    document: "document",
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

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    save: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find invoice usecase unit test", () => {
  it("should find invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);
    const input = {
      id: "1"
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.createdAt).toBe(invoice.createdAt);
    expect(result.items.length).toBe(invoice.items.length);
  });

  
  it("should generate invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);
    const input = {
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number:  invoice.address.number,
      complement:  invoice.address.complement,
      city:  invoice.address.city,
      state:  invoice.address.state,
      zipCode:  invoice.address.zipCode,
      items: invoice.items.map((currentItem) => {
        return {
          id: currentItem.id.id,
          name: currentItem.name,
          price: currentItem.price
        }
      })
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.items.length).toBe(invoice.items.length);
  });

});
