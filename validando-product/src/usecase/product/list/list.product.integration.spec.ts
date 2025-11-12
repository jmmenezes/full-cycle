import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

  it("should list product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const prod1 = new Product("123", "Prod", 12.12);
    await productRepository.create(prod1);
    const prod2 = new Product("456", "Prod2", 12.12);
    await productRepository.create(prod2);

    const result = await usecase.execute({});

    expect(result.products.length).toEqual(2);
    expect(result.products[0].name).toBe(prod1.name);
    expect(result.products[0].price).toBe(prod1.price);
    expect(result.products[1].name).toBe(prod2.name);
    expect(result.products[1].price).toBe(prod2.price);
  });
});
