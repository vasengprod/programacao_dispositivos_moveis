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

const categorias = ["Dados & BI", "Negócios", "Tecnologia"];

function getIcon(categoria: string) {
  if (categoria === "Dados & BI") return "bar-chart";
  if (categoria === "Negócios") return "briefcase";
  return "code-slash";
}

function getIconColor(categoria: string) {
  if (categoria === "Dados & BI") return "#00D084";
  if (categoria === "Negócios") return "#60A5FA";
  return "#F59E0B";
}

export default function Sobre() {
  const { curriculo, loading, erro } = useCurriculo();

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator color="#00D084" size="large" />
        <Text style={styles.stateText}>Carregando dados...</Text>
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
          <Text style={styles.label}>SOBRE MIM</Text>

          <Text style={styles.title}>Dados aplicados à estratégia comercial.</Text>

          <Text style={styles.subtitle}>
            Sou Analista de Dados com atuação orientada a negócios. Trabalho com
            análise comercial, precificação, indicadores de desempenho e construção
            de dashboards para apoiar decisões de compra, vendas e rentabilidade.
          </Text>
        </View>

        <View style={styles.valueCard}>
          <View style={styles.valueIcon}>
            <Ionicons name="trending-up" size={20} color="#00D084" />
          </View>

          <View style={styles.valueTextArea}>
            <Text style={styles.valueTitle}>Proposta de valor</Text>
            <Text style={styles.valueText}>
              Transformar dados brutos em análises claras, acionáveis e conectadas
              aos objetivos do negócio.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Competências principais</Text>
          <Text style={styles.sectionSubtitle}>
            Combinação de análise técnica, visão de negócio e comunicação de dados.
          </Text>
        </View>

        <View style={styles.grid}>
          {categorias.map((categoria) => {
            const tecnologias = curriculo.tecnologias.filter(
              (tecnologia) => tecnologia.categoria === categoria
            );

            return (
              <View key={categoria} style={styles.card}>
                <View
                  style={[
                    styles.iconBox,
                    { borderColor: getIconColor(categoria) },
                  ]}
                >
                  <Ionicons
                    name={getIcon(categoria)}
                    size={21}
                    color={getIconColor(categoria)}
                  />
                </View>

                <Text style={styles.cardTitle}>{categoria}</Text>

                <View style={styles.tags}>
                  {tecnologias.map((tecnologia) => (
                    <Text key={tecnologia.id} style={styles.tag}>
                      {tecnologia.nome}
                    </Text>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.appCard}>
          <View style={styles.appHeader}>
            <Ionicons name="phone-portrait" size={18} color="#00D084" />
            <Text style={styles.appTitle}>Sobre este aplicativo</Text>
          </View>

          <Text style={styles.appText}>
            Este currículo/portfólio foi desenvolvido em React Native com Expo
            Router. O app possui navegação entre telas, consumo de API REST criada
            com Express e PostgreSQL, filtro interativo de projetos por tecnologia
            e visual moderno.
          </Text>
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
    maxWidth: 1040,
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
    marginBottom: 24,
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
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 780,
    textAlign: "center",
  },

  valueCard: {
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginBottom: 28,
  },

  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  valueTextArea: {
    flex: 1,
  },

  valueTitle: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },

  valueText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 21,
  },

  sectionHeader: {
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    color: "#F9FAFB",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },

  sectionSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 22,
    padding: 18,
    width: "100%",
    maxWidth: 320,
    minHeight: 190,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  cardTitle: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
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
    fontSize: 12,
    fontWeight: "800",
  },

  appCard: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 22,
    padding: 20,
    marginTop: 24,
  },

  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  appTitle: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "900",
  },

  appText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
  },
});