import { Router } from "express";
import { OrderItemController } from "../controllers/OrderItemController.js";

const router = Router();
const controller = new OrderItemController();

router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
