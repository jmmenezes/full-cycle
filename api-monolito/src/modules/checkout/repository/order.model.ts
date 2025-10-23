import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "../../product-adm/repository/product.model";
import { ClientModel } from "../../client-adm/repository/client.model";
import { OrderProductModel } from "./order-product.model";

@Table({
  tableName: 'order',
  timestamps: false
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  status: string

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  declare client_id: string;

  @BelongsTo(() => ClientModel)
  client!: ClientModel;

  @BelongsToMany(() => ProductModel, () => OrderProductModel)
  products!: ProductModel[];

}