import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TopNav from "../components/TopNav";
import { useCurriculo } from "../hooks/useCurriculo";

export default function Academica() {
  const { curriculo, loading, erro } = useCurriculo();

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator color="#00D084" size="large" />
        <Text style={styles.stateText}>Carregando formação...</Text>
      </View>
    );
  }

  if (erro || !curriculo) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorText}>{erro || "Erro ao carregar dados."}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TopNav />

      <View style={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.label}>FORMAÇÃO</Text>
          <Text style={styles.title}>Formação Acadêmica</Text>
          <Text style={styles.subtitle}>
            Formação multidisciplinar combinando tecnologia, engenharia, dados,
            processos e visão de negócio.
          </Text>
        </View>

        <View style={styles.timelineWrapper}>
          <View style={styles.verticalLine} />

          {curriculo.experiencias_academicas.map((item) => (
            <View key={item.id} style={styles.timelineItem}>
              <View style={styles.markerArea}>
                <View style={styles.dot}>
                  <Ionicons name="school" size={14} color="#04130D" />
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleArea}>
                    <Text style={styles.cardTitle}>{item.curso}</Text>
                    <Text style={styles.institution}>{item.instituicao}</Text>
                  </View>

                  <View style={styles.periodPill}>
                    <Text style={styles.periodText}>{item.periodo}</Text>
                  </View>
                </View>

                <Text style={styles.description}>{item.descricao}</Text>

                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05070A",
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },

  page: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },

  centerState: {
    flex: 1,
    backgroundColor: "#05070A",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  stateText: {
    color: "#9CA3AF",
    fontWeight: "700",
  },

  errorText: {
    color: "#F87171",
    fontWeight: "800",
  },

  hero: {
    alignItems: "center",
    marginBottom: 34,
  },

  label: {
    color: "#00D084",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 10,
  },

  title: {
    color: "#F9FAFB",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    maxWidth: 720,
  },

  timelineWrapper: {
    position: "relative",
    width: "100%",
  },

  verticalLine: {
    position: "absolute",
    left: 19,
    top: 10,
    bottom: 20,
    width: 1,
    backgroundColor: "#1F2937",
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 22,
  },

  markerArea: {
    width: 40,
    alignItems: "center",
    paddingTop: 24,
  },

  dot: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#00D084",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  card: {
    flex: 1,
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 22,
    padding: 20,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 14,
  },

  cardTitleArea: {
    flex: 1,
  },

  cardTitle: {
    color: "#F9FAFB",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
  },

  institution: {
    color: "#00D084",
    fontSize: 15,
    fontWeight: "800",
  },

  periodPill: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  periodText: {
    color: "#D1D5DB",
    fontSize: 12,
    fontWeight: "800",
  },

  description: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },

  status: {
    alignSelf: "flex-start",
    color: "#93C5FD",
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1D4ED8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "900",
  },
});