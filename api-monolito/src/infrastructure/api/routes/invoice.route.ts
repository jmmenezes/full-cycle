import express, { Request, Response } from "express";

import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice.usecase";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import GenerateInvoiceUseCase from "../../../modules/invoice/usecase/generate-invoice.usecase";
export const invoiceRoute = express.Router();

invoiceRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository())

  try {

    const findInputDto = {
      id: req.body.id,
    };

    const output = await usecase.execute(findInputDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

invoiceRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new InvoiceRepository())

  try {

    const generateInvoiceDto = {
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items
  }

    const output = await usecase.execute(generateInvoiceDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

