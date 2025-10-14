import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import Invoice from "../domain/invoice";
import invoiceItems from "../domain/invoice-items";
import InvoiceGateway from "../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address(input.street, input.number, input.complement,
                           input.city, input.state, input.zipCode),
      items: input.items.map((currentItem) => {
            return new invoiceItems({
              id: new Id(currentItem.id),
              name: currentItem.name,
              price: currentItem.price,        
            });
          })
    });
    const persistInvoice = await this.invoiceRepository.save(
      invoice
    );
    return {
      id: persistInvoice.id.id,
      name: persistInvoice.name,
      document: persistInvoice.document,
      street: persistInvoice.address.street,
      number: persistInvoice.address.number,
      complement: persistInvoice.address.complement,
      city: persistInvoice.address.city,
      state: persistInvoice.address.complement,
      zipCode: persistInvoice.address.zipCode,
      items: persistInvoice.items.map((currentItem) => {
        return {
          id: currentItem.id.id,
          name: currentItem.name,
          price: currentItem.price
        }
      }),
      total: 0
    };
  }
}
