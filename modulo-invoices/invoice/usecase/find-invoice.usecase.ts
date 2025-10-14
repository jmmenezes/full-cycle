import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
    ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(
      input.id
    );
    
    let items = invoice.items.map((currentItem) => {
            return {
              id: currentItem.id.id,
              name: currentItem.name,
              price: currentItem.price
            };
          });

    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: items,
      total: total,
      createdAt: invoice.createdAt
    };
  }
}
