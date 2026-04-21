import axios from "axios";

const urlBase = "https://tarefas-api-express-migracao.vercel.app/tarefas";

const headersJson = {
  "Content-Type": "application/json",
};

function normalizarTarefa(tarefa) {
  return {
    ...tarefa,
    objectId: tarefa.objectId ?? tarefa.id,
  };
}

export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data.map(normalizarTarefa);
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(
    urlBase,
    { ...novaTarefa, concluida: false },
    { headers: headersJson }
  );
  return normalizarTarefa(response.data);
}

export async function atualizarTarefa(objectId, dadosAtualizados) {
  const response = await axios.put(`${urlBase}/${objectId}`, dadosAtualizados, {
    headers: headersJson,
  });
  return normalizarTarefa(response.data);
}

export async function deletarTarefa(objectId) {
  const response = await axios.delete(`${urlBase}/${objectId}`);
  return response.data;
}