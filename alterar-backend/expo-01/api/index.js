import axios from "axios";

const urlBase = "https://SEU-BACKEND.vercel.app/tarefas";

const headersJson = {
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(
    urlBase,
    { ...novaTarefa, concluida: false },
    { headers: headersJson }
  );
  return response.data;
}

export async function atualizarTarefa(objectId, dadosAtualizados) {
  const response = await axios.put(`${urlBase}/${objectId}`, dadosAtualizados, {
    headers: headersJson,
  });
  return response.data;
}

export async function deletarTarefa(objectId) {
  const response = await axios.delete(`${urlBase}/${objectId}`);
  return response.data;
}