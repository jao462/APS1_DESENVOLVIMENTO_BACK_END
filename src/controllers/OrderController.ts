import { Request, Response } from "express";
import { OrderRepository } from "../repositories/OrderRepository.js";

const repository = new OrderRepository();
const statuses = ["pending", "preparing", "ready", "completed", "cancelled"];

export class OrderController {
  async findAll(req: Request, res: Response) {
    try { res.status(200).json(await repository.findAll()); }
    catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar pedidos." }); }
  }

  async findById(req: Request, res: Response) {
    try {
      const order = await repository.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Pedido não encontrado." });
      res.status(200).json(order);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar pedido." }); }
  }

  async create(req: Request, res: Response) {
    try {
      const { customer_name, status } = req.body;
      if (!customer_name || typeof customer_name !== "string") return res.status(400).json({ message: "customer_name é obrigatório." });
      if (status !== undefined && !statuses.includes(status)) return res.status(400).json({ message: "Status inválido." });
      res.status(201).json(await repository.create({ customer_name, status }));
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao criar pedido." }); }
  }

  async update(req: Request, res: Response) {
    try {
      const { customer_name, status } = req.body;
      if (status !== undefined && !statuses.includes(status)) return res.status(400).json({ message: "Status inválido." });
      const order = await repository.update(req.params.id, { customer_name, status });
      if (!order) return res.status(404).json({ message: "Pedido não encontrado." });
      res.status(200).json(order);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao atualizar pedido." }); }
  }

  async delete(req: Request, res: Response) {
    try {
      const order = await repository.delete(req.params.id);
      if (!order) return res.status(404).json({ message: "Pedido não encontrado." });
      res.status(200).json({ message: "Pedido removido com sucesso." });
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao remover pedido." }); }
  }
}
