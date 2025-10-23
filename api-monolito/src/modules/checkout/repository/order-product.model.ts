import { OrderModel } from "./order.model";
import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import { ProductModel } from "../../product-adm/repository/product.model";

@Table({ tableName: 'order_product', timestamps: false })
export class OrderProductModel extends Model {
  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  order_id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  product_id: string;
  
}