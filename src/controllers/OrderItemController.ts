import { Request, Response } from "express";
import { OrderItemRepository } from "../repositories/OrderItemRepository.js";

const repository = new OrderItemRepository();

export class OrderItemController {
  async findAll(req: Request, res: Response) {
    try { res.status(200).json(await repository.findAll()); }
    catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar itens." }); }
  }

  async findById(req: Request, res: Response) {
    try {
      const item = await repository.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item não encontrado." });
      res.status(200).json(item);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar item." }); }
  }

  async create(req: Request, res: Response) {
    try {
      const { order_id, product_id, quantity, unit_price } = req.body;
      if (!order_id || !product_id || quantity === undefined || unit_price === undefined) return res.status(400).json({ message: "order_id, product_id, quantity e unit_price são obrigatórios." });
      if (!Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({ message: "quantity deve ser um inteiro maior que zero." });
      if (typeof unit_price !== "number" || unit_price < 0) return res.status(400).json({ message: "unit_price deve ser maior ou igual a zero." });
      res.status(201).json(await repository.create({ order_id, product_id, quantity, unit_price }));
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao criar item. Verifique order_id e product_id." }); }
  }

  async update(req: Request, res: Response) {
    try {
      const { order_id, product_id, quantity, unit_price } = req.body;
      if (quantity !== undefined && (!Number.isInteger(quantity) || quantity <= 0)) return res.status(400).json({ message: "quantity deve ser um inteiro maior que zero." });
      if (unit_price !== undefined && (typeof unit_price !== "number" || unit_price < 0)) return res.status(400).json({ message: "unit_price deve ser maior ou igual a zero." });
      const item = await repository.update(req.params.id, { order_id, product_id, quantity, unit_price });
      if (!item) return res.status(404).json({ message: "Item não encontrado." });
      res.status(200).json(item);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao atualizar item." }); }
  }

  async delete(req: Request, res: Response) {
    try {
      const item = await repository.delete(req.params.id);
      if (!item) return res.status(404).json({ message: "Item não encontrado." });
      res.status(200).json({ message: "Item removido com sucesso." });
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao remover item." }); }
  }
}
