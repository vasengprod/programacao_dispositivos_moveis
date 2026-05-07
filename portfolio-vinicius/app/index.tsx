import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import TopNav from "../components/TopNav";
import { useCurriculo } from "../hooks/useCurriculo";

function getLink(links: { tipo: string; url: string }[] = [], tipo: string) {
  return links.find((link) => link.tipo.toLowerCase() === tipo.toLowerCase())?.url;
}

export default function Home() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const { curriculo, loading, erro } = useCurriculo();

  const pessoa = curriculo?.pessoa;
  const github = getLink(curriculo?.links, "GitHub") || "https://github.com/vasengprod";
  const linkedin =
    getLink(curriculo?.links, "LinkedIn") ||
    "https://www.linkedin.com/in/vinícius-almeida-3b171b295";

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator color="#00D084" size="large" />
        <Text style={styles.stateText}>Carregando currículo...</Text>
      </View>
    );
  }

  if (erro || !pessoa) {
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
        <View style={[styles.heroCard, isWide && styles.heroCardDesktop]}>
          <View style={[styles.leftSide, isWide && styles.leftSideDesktop]}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>Dados aplicados a negócios</Text>
            </View>

            <Text style={styles.title}>
              Transformando dados em{" "}
              <Text style={styles.highlight}>decisões estratégicas</Text>.
            </Text>

            <Text style={styles.name}>{pessoa.nome}</Text>

            <Text style={styles.role}>{pessoa.cargo}</Text>

            <Text style={styles.description}>{pessoa.resumo}</Text>

            <View style={styles.buttonsRow}>
              <Pressable style={styles.primaryButton} onPress={() => Linking.openURL(github)}>
                <Ionicons name="logo-github" size={18} color="#04130D" />
                <Text style={styles.primaryButtonText}>GitHub</Text>
              </Pressable>

              <Pressable style={styles.secondaryButton} onPress={() => Linking.openURL(linkedin)}>
                <Ionicons name="logo-linkedin" size={18} color="#F9FAFB" />
                <Text style={styles.secondaryButtonText}>LinkedIn</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.rightSide, isWide && styles.rightSideDesktop]}>
            <View style={styles.photoCard}>
              <Image
                source={{
                  uri: "https://avatars.githubusercontent.com/vasengprod",
                }}
                style={styles.photo}
                resizeMode="cover"
              />

              <View style={styles.photoTagTop}>
                <Ionicons name="analytics" size={18} color="#00D084" />
                <Text style={styles.photoTagText}>Business Analytics</Text>
              </View>

              <View style={styles.photoTagBottom}>
                <Text style={styles.photoTagBottomTitle}>FOCO</Text>
                <Text style={styles.photoTagBottomText}>Comercial • Pricing • BI</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Especialidades</Text>
          <Text style={styles.sectionSubtitle}>
            Competências centrais com foco em geração de valor para o negócio.
          </Text>
        </View>

        <View style={[styles.cardsGrid, isWide && styles.cardsGridDesktop]}>
          <View style={styles.infoCard}>
            <View style={styles.iconBox}>
              <Ionicons name="bar-chart" size={20} color="#00D084" />
            </View>
            <Text style={styles.infoCardTitle}>Power BI</Text>
            <Text style={styles.infoCardText}>
              Dashboards executivos, indicadores e storytelling para suporte à decisão.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.iconBox}>
              <Ionicons name="server" size={20} color="#60A5FA" />
            </View>
            <Text style={styles.infoCardTitle}>SQL</Text>
            <Text style={styles.infoCardText}>
              Extração, análise e estruturação de dados para visão analítica do negócio.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.iconBox}>
              <Ionicons name="code-slash" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.infoCardTitle}>Python</Text>
            <Text style={styles.infoCardText}>
              Automação, tratamento de dados e apoio a análises mais robustas.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.iconBox}>
              <Ionicons name="briefcase" size={20} color="#22C55E" />
            </View>
            <Text style={styles.infoCardTitle}>Negócios</Text>
            <Text style={styles.infoCardText}>
              Experiência com vendas, precificação, margem, portfólio e performance comercial.
            </Text>
          </View>
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
    maxWidth: 1180,
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

  heroCard: {
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 28,
    padding: 24,
    gap: 24,
  },

  heroCardDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 520,
    paddingHorizontal: 34,
    paddingVertical: 30,
  },

  leftSide: {
    gap: 16,
  },

  leftSideDesktop: {
    flex: 1.1,
    paddingRight: 28,
  },

  rightSide: {
    width: "100%",
  },

  rightSideDesktop: {
    flex: 0.9,
    alignItems: "flex-end",
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#083424",
  },

  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#00D084",
  },

  badgeText: {
    color: "#00D084",
    fontWeight: "800",
    fontSize: 13,
  },

  title: {
    color: "#F9FAFB",
    fontSize: 42,
    lineHeight: 50,
    fontWeight: "900",
    maxWidth: 670,
  },

  highlight: {
    color: "#00D084",
  },

  name: {
    color: "#F9FAFB",
    fontSize: 30,
    fontWeight: "900",
  },

  role: {
    color: "#93C5FD",
    fontSize: 17,
    fontWeight: "700",
  },

  description: {
    color: "#C7D2DE",
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 650,
  },

  buttonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#00D084",
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 14,
  },

  primaryButtonText: {
    color: "#04130D",
    fontWeight: "900",
    fontSize: 15,
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#121826",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 14,
  },

  secondaryButtonText: {
    color: "#F9FAFB",
    fontWeight: "800",
    fontSize: 15,
  },

  photoCard: {
    width: "100%",
    maxWidth: 360,
    height: 420,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#0F172A",
    alignSelf: "center",
    position: "relative",
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  photoTagTop: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(9,14,22,0.88)",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  photoTagText: {
    color: "#F9FAFB",
    fontWeight: "800",
    fontSize: 13,
  },

  photoTagBottom: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "rgba(9,14,22,0.88)",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  photoTagBottomTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 4,
    letterSpacing: 1,
  },

  photoTagBottomText: {
    color: "#F9FAFB",
    fontSize: 14,
    fontWeight: "800",
  },

  sectionHeader: {
    marginTop: 30,
    marginBottom: 18,
    alignItems: "center",
  },

  sectionTitle: {
    color: "#F9FAFB",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },

  sectionSubtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },

  cardsGrid: {
    gap: 16,
  },

  cardsGridDesktop: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },

  infoCard: {
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 22,
    padding: 18,
    minHeight: 155,
    width: "100%",
    maxWidth: 390,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  infoCardTitle: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },

  infoCardText: {
    color: "#B8C1CC",
    fontSize: 14,
    lineHeight: 22,
  },
});