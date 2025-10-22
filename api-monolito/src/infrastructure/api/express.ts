import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemsModel from "../../modules/invoice/repository/invoice-items.model";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel]);
  await sequelize.sync();
}
setupDb();