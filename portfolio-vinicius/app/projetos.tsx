import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import TopNav from "../components/TopNav";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

const GITHUB_USER = "vasengprod";
const GITHUB_PROFILE = "https://github.com/vasengprod";

function formatRepoName(name: string) {
  return name
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getTechnology(repo: GithubRepo) {
  return repo.language || "Projeto";
}

export default function Projetos() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    async function carregarRepositorios() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar repositórios do GitHub.");
        }

        const data: GithubRepo[] = await response.json();

        const reposOrdenados = data.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        setRepos(reposOrdenados);
      } catch (error) {
        console.log(error);
        setErro("Não foi possível carregar os projetos do GitHub.");
      } finally {
        setLoading(false);
      }
    }

    carregarRepositorios();
  }, []);

  const filtros = useMemo(() => {
    const tecnologias = repos
      .map((repo) => getTechnology(repo))
      .filter(Boolean);

    return ["Todos", ...Array.from(new Set(tecnologias))];
  }, [repos]);

  const projetosFiltrados = useMemo(() => {
    if (filtro === "Todos") {
      return repos;
    }

    return repos.filter((repo) => getTechnology(repo) === filtro);
  }, [repos, filtro]);

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator color="#00D084" size="large" />
        <Text style={styles.stateText}>Carregando projetos do GitHub...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TopNav />

      <View style={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.label}>PORTFÓLIO</Text>

          <Text style={styles.title}>Projetos no GitHub</Text>

          <Text style={styles.subtitle}>
            Repositórios conectados ao meu desenvolvimento técnico, com ênfase em
            dados, tecnologia e soluções aplicadas a negócios.
          </Text>

          <Pressable
            style={styles.githubButton}
            onPress={() => Linking.openURL(GITHUB_PROFILE)}
          >
            <Ionicons name="logo-github" size={18} color="#04130D" />
            <Text style={styles.githubButtonText}>Ver perfil no GitHub</Text>
            <Ionicons name="open-outline" size={16} color="#04130D" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {filtros.map((item) => (
            <Pressable
              key={item}
              onPress={() => setFiltro(item)}
              style={[
                styles.filterButton,
                filtro === item && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filtro === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.resultText}>
          {projetosFiltrados.length} projeto
          {projetosFiltrados.length === 1 ? "" : "s"} encontrado
          {projetosFiltrados.length === 1 ? "" : "s"}
        </Text>

        <View style={[styles.projectsGrid, isWide && styles.projectsGridDesktop]}>
          {projetosFiltrados.map((repo) => {
            const tecnologia = getTechnology(repo);

            return (
              <Pressable
                key={repo.id}
                style={[styles.card, isWide && styles.cardDesktop]}
                onPress={() => Linking.openURL(repo.html_url)}
              >
                <View style={styles.cardTop}>
                  <View style={styles.iconBox}>
                    <Ionicons name="code-slash" size={22} color="#F9FAFB" />
                  </View>

                  <View style={styles.languageBox}>
                    <Text style={styles.language}>{tecnologia}</Text>
                    <Ionicons name="logo-github" size={18} color="#9CA3AF" />
                  </View>
                </View>

                <Text style={styles.cardTitle}>{formatRepoName(repo.name)}</Text>

                {repo.fork && (
                  <View style={styles.forkBadge}>
                    <Ionicons name="git-branch-outline" size={13} color="#93C5FD" />
                    <Text style={styles.forkText}>Fork</Text>
                  </View>
                )}

                <View style={styles.cardFooter}>
                  <Text style={styles.tag}>{tecnologia}</Text>

                  <View style={styles.openArea}>
                    <Text style={styles.openText}>Abrir</Text>
                    <Ionicons name="open-outline" size={16} color="#00D084" />
                  </View>
                </View>
              </Pressable>
            );
          })}
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

  hero: {
    alignItems: "center",
    marginBottom: 24,
  },

  label: {
    color: "#00D084",
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 10,
    fontSize: 12,
    textAlign: "center",
  },

  title: {
    color: "#F9FAFB",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 720,
    marginBottom: 18,
    textAlign: "center",
  },

  githubButton: {
    alignSelf: "center",
    backgroundColor: "#00D084",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  githubButtonText: {
    color: "#04130D",
    fontWeight: "900",
    fontSize: 13,
  },

  filtersScroll: {
    marginBottom: 18,
  },

  filtersContent: {
    gap: 10,
    paddingRight: 24,
    justifyContent: "center",
    flexGrow: 1,
  },

  filterButton: {
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },

  filterButtonActive: {
    backgroundColor: "#00D084",
    borderColor: "#00D084",
  },

  filterText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "900",
  },

  filterTextActive: {
    color: "#04130D",
  },

  resultText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  projectsGrid: {
    gap: 16,
  },

  projectsGridDesktop: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#0B1118",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 24,
    padding: 20,
    minHeight: 190,
    justifyContent: "space-between",
  },

  cardDesktop: {
    width: "31%",
    minWidth: 300,
    maxWidth: 370,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },

  languageBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  language: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "900",
  },

  cardTitle: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 24,
    lineHeight: 24,
  },

  forkBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1D4ED8",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
  },

  forkText: {
    color: "#93C5FD",
    fontSize: 11,
    fontWeight: "900",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
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
    fontWeight: "900",
  },

  openArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  openText: {
    color: "#00D084",
    fontSize: 12,
    fontWeight: "900",
  },
});