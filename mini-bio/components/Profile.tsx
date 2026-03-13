import { View, Text, Image, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>

      <Image
        source={require("../assets/images/2M4A5274.jpg")}
        style={styles.image}
      />

      <Text style={styles.name}>Vinicius Almeida</Text>

      <Text style={styles.bio}>
        Sou Engenheiro de Produção e tenho grande interesse por tecnologia e análise de dados.
        Gosto de entender como as coisas funcionam e de buscar soluções simples para problemas do dia a dia.
      </Text>

      <Text style={styles.bio}>
        Atualmente venho estudando programação e desenvolvimento mobile,
        explorando na prática como transformar ideias em pequenos projetos e aplicações.
      </Text>

      <Text style={styles.bio}>
        Ainda estou no começo dessa jornada, mas sigo aprendendo um pouco mais a cada projeto
        e aproveitando bastante o processo.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
    marginTop: 60,
    backgroundColor: "#ffffff",
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginBottom: 20,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 15,
  },

  bio: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});