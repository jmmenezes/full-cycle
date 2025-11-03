import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import { Op } from 'sequelize';

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          total: entity.total,
        },
        {
          where: { id: entity.id }
        }
      );

      const newItems = entity.items;
      const orderId = entity.id;

      const newItemsIds = newItems.map(item => item.id).filter(id => id !== null);
      
      await OrderItemModel.destroy({
          where: {
              order_id: orderId,
              id: { [Op.in]: newItemsIds } 
          }
      });
      for (const item of newItems) {        
        await OrderItemModel.create(
          {
            order_id: orderId,
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            product_id: item.productId
          }
        );        
      }
      
    } catch (error) {
      throw error;
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
        try {
          orderModel = await OrderModel.findOne({
            where: {
              id,
            },
            include: ["items"],
            rejectOnEmpty: true,
          });
        } catch (error) {
          throw new Error("Order not found");
        }
    
        let items = orderModel.items.map((item) => {
          return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
          );          
        });
        const order = new Order(id, orderModel.customer_id, items);
        return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [
        { 
          model: OrderItemModel,
          as: 'items'
        }
      ]
    });
    return orderModels.map((orderModel) => {
      let items = orderModel.items.map((item) => {
          return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
          );          
        });      
      return new Order(orderModel.id, orderModel.customer_id, items);
      }
    );

  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
