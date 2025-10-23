import express, { Request, Response } from "express";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import ProductCatelogRepository from "../../../modules/store-catalog/repository/product.repository";
import ClientAdmFacade from "../../../modules/client-adm/facade/client-adm.facade";
import ProductAdmFacade from "../../../modules/product-adm/facade/product-adm.facade";
import StoreCatalogFacade from "../../../modules/store-catalog/facade/store-catalog.facade";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import FindClientUseCase from "../../../modules/client-adm/usecase/find-client/find-client.usecase";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../../../modules/product-adm/usecase/check-stock/check-stock.usecase";
import FindProductUseCase from "../../../modules/store-catalog/usecase/find-product/find-product.usecase";
import FindAllProductsUsecase from "../../../modules/store-catalog/usecase/find-all-products/find-all-products.usecase";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new PlaceOrderUseCase(new ClientAdmFacade(
      {
        findUsecase: new FindClientUseCase(new ClientRepository()),
        addUsecase: new AddClientUseCase(new ClientRepository()),
      }),
      new ProductAdmFacade({
        addUseCase: new AddProductUseCase(new ProductRepository()),
        stockUseCase: new CheckStockUseCase(new ProductRepository()),
      }),
      new StoreCatalogFacade({
        findUseCase: new FindProductUseCase(new ProductCatelogRepository()),
        findAllUseCase: new FindAllProductsUsecase(new ProductCatelogRepository()),
      }),
      new CheckoutRepository(),
    );

  try {

    const placeOrderInputDto = {
      clientId: req.body.clientId,
      products: req.body.products
    };

    const output = await usecase.execute(placeOrderInputDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

