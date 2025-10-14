import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(private generateInvoiceUseCase: UseCaseInterface,
        private findInvoiceUseCase: UseCaseInterface
    ) {}

    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this.generateInvoiceUseCase.execute(input);
    }
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this.findInvoiceUseCase.execute(input);
    }
}
