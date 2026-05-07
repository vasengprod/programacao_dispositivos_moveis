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

const tags = [
  "Power BI",
  "SQL",
  "Precificação",
  "Vendas",
  "Margem",
  "Rentabilidade",
  "Portfólio",
];

export default function Profissional() {
  const { curriculo, loading, erro } = useCurriculo();

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator color="#00D084" size="large" />
        <Text style={styles.stateText}>Carregando experiência...</Text>
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
          <Text style={styles.label}>CARREIRA</Text>
          <Text style={styles.title}>Experiência Profissional</Text>
          <Text style={styles.subtitle}>
            Trajetória construída na interseção entre dados, operações, tecnologia
            e estratégia comercial.
          </Text>
        </View>

        <View style={styles.timeline}>
          {curriculo.experiencias_profissionais.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.lineArea}>
                <View style={styles.dot}>
                  <Ionicons name="briefcase" size={13} color="#04130D" />
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.cargo}</Text>
                <Text style={styles.company}>{item.empresa}</Text>

                <View style={styles.periodPill}>
                  <Text style={styles.periodText}>{item.periodo}</Text>
                </View>

                <Text style={styles.description}>{item.descricao}</Text>

                <View style={styles.impactBox}>
                  <View style={styles.impactHeader}>
                    <Ionicons name="analytics" size={15} color="#60A5FA" />
                    <Text style={styles.impactLabel}>Impacto</Text>
                  </View>
                  <Text style={styles.impactText}>{item.impacto}</Text>
                </View>

                <View style={styles.tags}>
                  {tags.map((tag) => (
                    <Text key={tag} style={styles.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
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
    marginBottom: 26,
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

  timeline: {
    width: "100%",
  },

  row: {
    flexDirection: "row",
  },

  lineArea: {
    width: 38,
    alignItems: "center",
  },

  dot: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#00D084",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    zIndex: 2,
  },

  card: {
    flex: 1,
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },

  cardTitle: {
    color: "#F9FAFB",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
  },

  company: {
    color: "#00D084",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 12,
  },

  periodPill: {
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 14,
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

  impactBox: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  impactHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 7,
  },

  impactLabel: {
    color: "#60A5FA",
    fontWeight: "900",
    fontSize: 13,
  },

  impactText: {
    color: "#F9FAFB",
    fontSize: 13,
    lineHeight: 20,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    color: "#D1D5DB",
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
  },
});