import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {

  const [idade, setIdade] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anoNascimento, setAnoNascimento] = useState<number | null>(null);

  const calcularAnoNascimento = (novaIdade: string, novoDia: string, novoMes: string) => {

    setIdade(novaIdade);
    setDia(novoDia);
    setMes(novoMes);

    const idadeNum = parseInt(novaIdade);
    const diaNum = parseInt(novoDia);
    const mesNum = parseInt(novoMes);

    if (!isNaN(idadeNum) && !isNaN(diaNum) && !isNaN(mesNum)) {

      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
      const diaAtual = hoje.getDate();
      const mesAtual = hoje.getMonth() + 1;

      let anoCalculado = anoAtual - idadeNum;

      // verifica se ainda não fez aniversário
      if (mesNum > mesAtual || (mesNum === mesAtual && diaNum > diaAtual)) {
        anoCalculado = anoCalculado - 1;
      }

      setAnoNascimento(anoCalculado);

    } else {
      setAnoNascimento(null);
    }
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      <View>

        <Text style={styles.titulo}>
          Calculadora de Ano de Nascimento
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua idade"
          keyboardType="numeric"
          value={idade}
          onChangeText={(text) =>
            calcularAnoNascimento(text, dia, mes)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Dia de nascimento"
          keyboardType="numeric"
          value={dia}
          maxLength={2}
          onChangeText={(text) =>
            calcularAnoNascimento(idade, text, mes)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Mês de nascimento"
          keyboardType="numeric"
          value={mes}
          maxLength={2}
          onChangeText={(text) =>
            calcularAnoNascimento(idade, dia, text)
          }
        />

        {anoNascimento !== null && (
          <Text style={styles.resultado}>
            Você nasceu em {anoNascimento}
          </Text>
        )}

      </View>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15
  },

  resultado: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }

});