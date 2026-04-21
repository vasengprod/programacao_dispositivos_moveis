import express from "express";

const app = express();

app.use(express.json());

let tarefas = [];

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const nova = {
    id: Date.now(),
    descricao: req.body.descricao,
    concluida: false
  };

  tarefas.push(nova);
  res.status(201).json(nova);
});

app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).end();

  tarefas[index] = { ...tarefas[index], ...req.body };
  res.json(tarefas[index]);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.json({});
});

export default app;