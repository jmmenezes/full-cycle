import { Column, ForeignKey, Model, PrimaryKey, Table, BelongsTo } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice-items",
  timestamps: false,
})
export default class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false, field: "name" })
  name: string;

  @Column({ allowNull: false, field: "price" })
  price: number;

  @Column({ allowNull: false, field: "created_at" })
  createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  updatedAt: Date;

  @ForeignKey(() => InvoiceModel)
  @Column
  invoiceId!: number; 

  @BelongsTo(() => InvoiceModel)
  invoice!: InvoiceModel; 
}
