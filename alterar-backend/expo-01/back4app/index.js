import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Tarefa";

const headers = {
  "X-Parse-Application-Id": "71lfFmyS54YIYmcO8l6Wq0o3FwpuJK8mME9XGAdv",
  "X-Parse-JavaScript-Key": "mr2uSLqEjmrLD29pOYEQn67IsGF5mPA4pkf4hLwn",
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase, { headers });
  return response.data.results;
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
  const response = await axios.delete(`${urlBase}/${objectId}`, {
    headers,
  });
  return response.data;
}