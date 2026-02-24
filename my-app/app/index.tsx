import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [anoNascimento, setAnoNascimento] = useState<string>('');
  const [idade, setIdade] = useState<number | null>(null);

  const calcularIdade = (ano: string) => {
    setAnoNascimento(ano);

    const anoAtual = new Date().getFullYear();

    if (ano.length === 4) {
      const idadeCalculada = anoAtual - parseInt(ano);
      setIdade(idadeCalculada);
    } else {
      setIdade(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Idade</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu ano de nascimento"
        keyboardType="numeric"
        value={anoNascimento}
        onChangeText={calcularIdade}
        maxLength={4}
      />

      {idade !== null && (
        <Text style={styles.resultado}>
          Sua idade é: {idade} anos
        </Text>
      )}
    </View>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  resultado: {
    fontSize: 18,
    textAlign: 'center',
  },
});