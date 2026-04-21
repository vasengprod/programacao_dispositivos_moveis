import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const app = express();
const sql = neon(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API de tarefas no ar 🚀"
  });
});

app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await sql`
      SELECT id, descricao, concluida
      FROM tarefas
      ORDER BY id DESC
    `;
    res.json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

app.post("/tarefas", async (req, res) => {
  try {
    const { descricao } = req.body;

    if (!descricao || !descricao.trim()) {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }

    const [nova] = await sql`
      INSERT INTO tarefas (descricao, concluida)
      VALUES (${descricao.trim()}, false)
      RETURNING id, descricao, concluida
    `;

    res.status(201).json(nova);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

app.put("/tarefas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { descricao, concluida } = req.body;

    const [atualizada] = await sql`
      UPDATE tarefas
      SET
        descricao = COALESCE(${descricao}, descricao),
        concluida = COALESCE(${concluida}, concluida)
      WHERE id = ${id}
      RETURNING id, descricao, concluida
    `;

    if (!atualizada) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(atualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

app.delete("/tarefas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [deletada] = await sql`
      DELETE FROM tarefas
      WHERE id = ${id}
      RETURNING id, descricao, concluida
    `;

    if (!deletada) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(deletada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

export default app;