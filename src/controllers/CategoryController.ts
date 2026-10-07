import { Request, Response } from "express";
import { CategoryRepository } from "../repositories/CategoryRepository.js";

const repository = new CategoryRepository();

export class CategoryController {
  async findAll(req: Request, res: Response) {
    try { res.status(200).json(await repository.findAll()); }
    catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar categorias." }); }
  }

  async findById(req: Request, res: Response) {
    try {
      const category = await repository.findById(req.params.id);
      if (!category) return res.status(404).json({ message: "Categoria não encontrada." });
      res.status(200).json(category);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar categoria." }); }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, active } = req.body;
      if (!name || typeof name !== "string") return res.status(400).json({ message: "O campo name é obrigatório." });
      const category = await repository.create({ name, description, active });
      res.status(201).json(category);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao criar categoria." }); }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, description, active } = req.body;
      const category = await repository.update(req.params.id, { name, description, active });
      if (!category) return res.status(404).json({ message: "Categoria não encontrada." });
      res.status(200).json(category);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao atualizar categoria." }); }
  }

  async delete(req: Request, res: Response) {
    try {
      const category = await repository.delete(req.params.id);
      if (!category) return res.status(404).json({ message: "Categoria não encontrada." });
      res.status(200).json({ message: "Categoria removida com sucesso." });
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao remover categoria. Verifique se existem produtos vinculados." }); }
  }
}
