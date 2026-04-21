import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  adicionarTarefa,
  atualizarTarefa,
  deletarTarefa,
  getTarefas,
} from "@/back4app";

export default function TarefasPage() {
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  const adicionarMutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: async () => {
      setMensagem("Tarefa adicionada com sucesso.");
      setDescricao("");
      await refetch();
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Não foi possível adicionar a tarefa.";
      setMensagem(`Erro ao adicionar: ${msg}`);
      console.log("Erro ao adicionar:", error?.response?.data || error.message);
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ objectId, dados }) => atualizarTarefa(objectId, dados),
    onSuccess: async () => {
      setMensagem("Tarefa atualizada com sucesso.");
      await refetch();
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Não foi possível atualizar a tarefa.";
      setMensagem(`Erro ao atualizar: ${msg}`);
      console.log("Erro ao atualizar:", error?.response?.data || error.message);
    },
  });

  const deletarMutation = useMutation({
    mutationFn: deletarTarefa,
    onSuccess: async () => {
      setMensagem("Tarefa deletada com sucesso.");
      await refetch();
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Não foi possível deletar a tarefa.";
      setMensagem(`Erro ao deletar: ${msg}`);
      console.log("Erro ao deletar:", error?.response?.data || error.message);
    },
  });

  async function handleAdicionarTarefaPress() {
    setMensagem("Botão clicado.");

    if (descricao.trim() === "") {
      setMensagem("Descrição inválida. Preencha a descrição da tarefa.");
      return;
    }

    setMensagem("Enviando tarefa...");
    await adicionarMutation.mutateAsync({ descricao });
  }

  async function handleAlternarConcluida(tarefa) {
    setMensagem("Atualizando tarefa...");
    await atualizarMutation.mutateAsync({
      objectId: tarefa.objectId,
      dados: {
        concluida: !tarefa.concluida,
      },
    });
  }

  async function handleDeletarTarefa(objectId) {
    setMensagem("Deletando tarefa...");
    await deletarMutation.mutateAsync(objectId);
  }

  const carregando =
    isFetching ||
    adicionarMutation.isPending ||
    atualizarMutation.isPending ||
    deletarMutation.isPending;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {carregando && <ActivityIndicator size="large" />}

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Button
        title="Adicionar Tarefa"
        onPress={handleAdicionarTarefaPress}
        disabled={adicionarMutation.isPending}
      />

      <View style={styles.hr} />

      {!!mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}

      <View style={styles.tasksContainer}>
        {data?.map((tarefa) => (
          <View key={tarefa.objectId} style={styles.taskItem}>
            <Text
              style={[
                styles.taskText,
                tarefa.concluida && styles.strikethroughText,
              ]}
            >
              {tarefa.descricao}
            </Text>

            <View style={styles.actions}>
              <Switch
                value={!!tarefa.concluida}
                onValueChange={() => handleAlternarConcluida(tarefa)}
              />

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletarTarefa(tarefa.objectId)}
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 40,
  },
  tasksContainer: {
    marginTop: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginBottom: 8,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  hr: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
    marginVertical: 10,
  },
  mensagem: {
    marginBottom: 12,
    fontSize: 16,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  taskText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  strikethroughText: {
    textDecorationLine: "line-through",
  },
});