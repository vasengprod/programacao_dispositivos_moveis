import { View, Text, StyleSheet } from "react-native";
import Profile from "../../components/Profile";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        App criado para a disciplina Programação para Dispositivos Móveis
      </Text>

      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 18,
    marginTop: 60,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});