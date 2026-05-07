import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function TopNav() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 900;

  const navItems = [
    { label: "Home", route: "/" },
    { label: "Sobre", route: "/sobre" },
    { label: "Projetos", route: "/projetos" },
    { label: "Profissional", route: "/profissional" },
    { label: "Formação", route: "/academica" },
  ];

  function isActive(route: string) {
    return pathname === route;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable style={styles.brand} onPress={() => router.push("/")}>
          <Text style={styles.brandIcon}>{">_"}</Text>
          <Text style={styles.brandText}>VINÍCIUS.ALMEIDA</Text>
        </Pressable>

        {isDesktop && (
          <View style={styles.centerNav}>
            {navItems.map((item) => (
              <Pressable
                key={item.route}
                onPress={() => router.push(item.route as any)}
                style={styles.navButton}
              >
                <Text
                  style={[
                    styles.navText,
                    isActive(item.route) && styles.activeNavText,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.rightActions}>
          <Pressable
            style={styles.iconButton}
            onPress={() => Linking.openURL("https://github.com/vasengprod")}
          >
            <Ionicons name="logo-github" size={20} color="#F9FAFB" />
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={() =>
              Linking.openURL(
                "https://www.linkedin.com/in/vinícius-almeida-3b171b295"
              )
            }
          >
            <Ionicons name="logo-linkedin" size={20} color="#F9FAFB" />
          </Pressable>
        </View>
      </View>

      {!isDesktop && (
        <View style={styles.mobileNav}>
          {navItems.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => router.push(item.route as any)}
              style={[
                styles.mobileNavButton,
                isActive(item.route) && styles.mobileNavButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.mobileNavText,
                  isActive(item.route) && styles.mobileNavTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 26,
    width: "100%",
  },

  container: {
    height: 72,
    borderBottomWidth: 1,
    borderBottomColor: "#161F2B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  brandIcon: {
    color: "#00D084",
    fontSize: 20,
    fontWeight: "900",
  },

  brandText: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  centerNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 26,
  },

  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  navText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "700",
  },

  activeNavText: {
    color: "#00D084",
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1F2937",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileNav: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 14,
  },

  mobileNavButton: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1F2937",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  mobileNavButtonActive: {
    backgroundColor: "#00D084",
    borderColor: "#00D084",
  },

  mobileNavText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "800",
  },

  mobileNavTextActive: {
    color: "#04130D",
  },
});