import express from "express";
import supabase from "./config/supabase.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Restaurant Ordering System API",
    version: "1.0.0",
  });
});

app.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase.from("categories").select("*").limit(1);

  if (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao consultar banco de dados.",
      error: error.message,
    });
  }

  res.status(200).json({
    success: true,
    message: "Conexão com Supabase realizada com sucesso!",
    data,
  });
});

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

export default app;
