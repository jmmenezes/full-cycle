import Address from "../value-object/address";


export class CustomerAddressChanged {
    readonly occurred_on: Date
    readonly event_version: number = 1;

    constructor(
        readonly aggregate_id: string,
        readonly name: string,
        readonly address: Address
    ){
        this.occurred_on = new Date();
    }
}