import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { HasMany } from "sequelize-typescript";
import InvoiceItemsModel from "./invoice-items.model";

@Table({
  tableName: "invoice",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false, field: "name" })
  name: string;

  @Column({ allowNull: false, field: "document" })
  document: string;

  @Column({ allowNull: false, field: "created_at" })
  createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  updatedAt: Date;

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: true })
  complement: string

  @Column({ allowNull: false })
  city: string

  @Column({ allowNull: false })
  state: string

  @Column({ allowNull: false })
  zipCode: string

  @HasMany(() => InvoiceItemsModel)
  items!: InvoiceItemsModel[]; 
}
