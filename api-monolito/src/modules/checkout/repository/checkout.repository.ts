import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ProductModel } from "../../product-adm/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderProductModel } from "./order-product.model";
import { OrderModel } from "./order.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    
    const myOrder = await OrderModel.create({
      id: new Id().id,
      client_id: order.client.id.id,
      status: 'new'
    });
    
  }

  async findOrder(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id } })

    if (!order) {
      throw new Error("Order not found")
    }

    return new Order({
        id: new Id(order.id),
        client: new Client({
          id: new Id(order.client.id),
          name: order.client.name,
          email: order.client.email,
          address: order.client.street
        }),
        products: null,
        status: order.status
      }
    )
  }

}