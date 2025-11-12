import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product type a", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute({
      type: "a",
      name: "Prod1",
      price: 12.12
    });

    expect("Prod1").toEqual(output.name);
    expect(12.12).toEqual(output.price);
  });

  it("should create a product type b", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute({
      type: "b",
      name: "Prod2",
      price: 21.21
    });

    expect("Prod2").toEqual(output.name);
    expect(21.21 * 2).toEqual(output.price);
  });

  it("should not create a product invalid type", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({
      type: "x",
      name: "Prod2",
      price: 21.21
    })).rejects.toThrow(
      "Product type not supported"
    );
 
  });
});
