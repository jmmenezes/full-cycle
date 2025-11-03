import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Address from "../../value-object/address";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogWhenCustomerChangedAddressHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    const id = event.eventData.aggregate_id;
    const nome = event.eventData.name;
    const endereco = event.eventData.address.street;

    console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`); 
  }
}
