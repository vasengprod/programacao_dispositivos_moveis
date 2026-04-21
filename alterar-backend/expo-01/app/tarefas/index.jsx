import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";

import {
  getTarefas,
  adicionarTarefa,
  deletarTarefa,
} from "../../api";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");

  async function carregarTarefas() {
    const dados = await getTarefas();
    setTarefas(dados);
  }

  async function handleAdicionar() {
    if (!descricao) return;

    await adicionarTarefa({ descricao });
    setDescricao("");
    carregarTarefas();
  }

  async function handleDeletar(id) {
    await deletarTarefa(id);
    carregarTarefas();
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Tarefas</Text>

      <TextInput
        placeholder="Digite uma tarefa"
        value={descricao}
        onChangeText={setDescricao}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
        }}
      />

      <Button title="Adicionar" onPress={handleAdicionar} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.objectId.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
            }}
          >
            <Text>{item.descricao}</Text>
            <Button
              title="Excluir"
              onPress={() => handleDeletar(item.objectId)}
            />
          </View>
        )}
      />
    </View>
  );
}