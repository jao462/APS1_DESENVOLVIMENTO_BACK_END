import { Request, Response } from "express";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { CategoryRepository } from "../repositories/CategoryRepository.js";

const repository = new ProductRepository();
const categoryRepository = new CategoryRepository();

export class ProductController {
  async findAll(req: Request, res: Response) {
    try { res.status(200).json(await repository.findAll()); }
    catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar produtos." }); }
  }

  async findById(req: Request, res: Response) {
    try {
      const product = await repository.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Produto não encontrado." });
      res.status(200).json(product);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao buscar produto." }); }
  }

  async create(req: Request, res: Response) {
    try {
      const { category_id, title, description, price, image, available, active } = req.body;
      if (!category_id || !title || !description || price === undefined) return res.status(400).json({ message: "category_id, title, description e price são obrigatórios." });
      if (typeof price !== "number" || price < 0) return res.status(400).json({ message: "price deve ser um número maior ou igual a zero." });
      if (!(await categoryRepository.findById(category_id))) return res.status(400).json({ message: "A categoria informada não existe." });
      const product = await repository.create({ category_id, title, description, price, image, available, active });
      res.status(201).json(product);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao criar produto." }); }
  }

  async update(req: Request, res: Response) {
    try {
      const { category_id, title, description, price, image, available, active } = req.body;
      if (price !== undefined && (typeof price !== "number" || price < 0)) return res.status(400).json({ message: "price deve ser um número maior ou igual a zero." });
      if (category_id && !(await categoryRepository.findById(category_id))) return res.status(400).json({ message: "A categoria informada não existe." });
      const product = await repository.update(req.params.id, { category_id, title, description, price, image, available, active });
      if (!product) return res.status(404).json({ message: "Produto não encontrado." });
      res.status(200).json(product);
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao atualizar produto." }); }
  }

  async delete(req: Request, res: Response) {
    try {
      const product = await repository.delete(req.params.id);
      if (!product) return res.status(404).json({ message: "Produto não encontrado." });
      res.status(200).json({ message: "Produto removido com sucesso." });
    } catch (error) { console.error(error); res.status(500).json({ message: "Erro ao remover produto. Verifique se ele está em algum pedido." }); }
  }
}
