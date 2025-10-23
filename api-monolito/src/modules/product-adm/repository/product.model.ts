import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "../../checkout/repository/order.model";
import { OrderProductModel } from "../../checkout/repository/order-product.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: true })
  description: string;

  @Column({ allowNull: true })
  purchasePrice: number;

  @Column({ allowNull: true })
  stock: number;

  @Column({ allowNull: true })
  createdAt: Date;

  @Column({ allowNull: true })
  updatedAt: Date;
}
