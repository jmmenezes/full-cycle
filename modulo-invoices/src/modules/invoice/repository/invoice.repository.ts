import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import invoiceItems from "../domain/invoice-items";
import InvoiceModel from "./invoice.model";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../../@shared/domain/value-object/address";
import { UpdatedAt } from "sequelize-typescript";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
        where: { "id": id },
        include: [
            { model: InvoiceItemsModel } 
        ]
    });
    
        if (!invoice) {
          throw new Error("Invoice not found")
        }

        let items = invoice.items.map((currentItem) => {
            return new invoiceItems({
              id: new Id(currentItem.id),
              name: currentItem.name,
              price: currentItem.price
            });
          });
    
        return new Invoice({
          id: new Id(invoice.id),
          name: invoice.name,
          document: invoice.document,
          address: new Address(invoice.street,
            invoice.number,
            invoice.complement,
            invoice.city,
            invoice.state,
            invoice.zipCode,
          ),
          items: items,
        })
  }

  async save(input: Invoice): Promise<Invoice> {
    const newInvoice = await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,      
    });

    
  if (input.items && input.items.length > 0) {
      input.items.map((currentItem: any) => (
        InvoiceItemsModel.create({
          id: currentItem.id.id, 
          invoiceId: newInvoice.id,
          name: currentItem.name,
          price: currentItem.price,
          updatedAt: currentItem.updatedAt,
          createdAt: currentItem.createdAt,
      })));
  }

  return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items
    });
  }
}
