import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const CARD_WIDTH = 135;
const CARD_HEIGHT = 46;

const ZONE_TOP = 120;
const ZONE_HEIGHT = 280;
const ZONE_GAP = 12;
const ZONE_WIDTH = (width - 48 - ZONE_GAP) / 2;

const LEFT_ZONE = {
  x: 24,
  y: ZONE_TOP,
  width: ZONE_WIDTH,
  height: ZONE_HEIGHT,
};

const RIGHT_ZONE = {
  x: 24 + ZONE_WIDTH + ZONE_GAP,
  y: ZONE_TOP,
  width: ZONE_WIDTH,
  height: ZONE_HEIGHT,
};

const items = [
  "Brócolis",
  "Pizza",
  "Chuva",
  "Praia",
  "Café",
  "Academia",
  "Sushi",
  "McDonald's",
];

function isInsideZone(x, y, zone) {
  "worklet";

  return (
    x >= zone.x &&
    x <= zone.x + zone.width &&
    y >= zone.y &&
    y <= zone.y + zone.height
  );
}

function clamp(value, min, max) {
  "worklet";

  return Math.min(Math.max(value, min), max);
}

function DraggableCard({ text, index }) {
  const column = index % 2;
  const row = Math.floor(index / 2);

  const startLeft =
    column === 0
      ? width / 2 - CARD_WIDTH - 8
      : width / 2 + 8;

  const startTop = 455 + row * 62;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      translateX.value = savedX.value + event.translationX;
      translateY.value = savedY.value + event.translationY;
    })
    .onEnd(() => {
      scale.value = withSpring(1);

      const cardCenterX = startLeft + translateX.value + CARD_WIDTH / 2;
      const cardCenterY = startTop + translateY.value + CARD_HEIGHT / 2;

      if (isInsideZone(cardCenterX, cardCenterY, LEFT_ZONE)) {
        const targetLeft = LEFT_ZONE.x + (LEFT_ZONE.width - CARD_WIDTH) / 2;
        const currentTop = startTop + translateY.value;

        const targetTop = clamp(
          currentTop,
          LEFT_ZONE.y + 75,
          LEFT_ZONE.y + LEFT_ZONE.height - CARD_HEIGHT - 16
        );

        translateX.value = withSpring(targetLeft - startLeft);
        translateY.value = withSpring(targetTop - startTop);
        return;
      }

      if (isInsideZone(cardCenterX, cardCenterY, RIGHT_ZONE)) {
        const targetLeft = RIGHT_ZONE.x + (RIGHT_ZONE.width - CARD_WIDTH) / 2;
        const currentTop = startTop + translateY.value;

        const targetTop = clamp(
          currentTop,
          RIGHT_ZONE.y + 75,
          RIGHT_ZONE.y + RIGHT_ZONE.height - CARD_HEIGHT - 16
        );

        translateX.value = withSpring(targetLeft - startLeft);
        translateY.value = withSpring(targetTop - startTop);
        return;
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: scale.value > 1 ? 10 : 1,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          {
            left: startLeft,
            top: startTop,
          },
          animatedStyle,
        ]}
      >
        <Text style={styles.cardText}>{text}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Arraste o que Eu Gosto / Não Gosto</Text>

        <View style={styles.zonesWrapper}>
          <View style={[styles.zone, styles.dislikeZone]}>
            <Text style={styles.zoneTitle}>Coisas que NÃO gosto</Text>
          </View>

          <View style={[styles.zone, styles.likeZone]}>
            <Text style={styles.zoneTitle}>Coisas que GOSTO</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Arraste os cartões para uma coluna</Text>

        {items.map((item, index) => (
          <DraggableCard key={item} text={item} index={index} />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 24,
  },
  zonesWrapper: {
    position: "absolute",
    top: ZONE_TOP,
    left: 24,
    right: 24,
    flexDirection: "row",
    gap: ZONE_GAP,
  },
  zone: {
    width: ZONE_WIDTH,
    height: ZONE_HEIGHT,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 12,
    alignItems: "center",
  },
  dislikeZone: {
    backgroundColor: "#ffe5e5",
    borderColor: "#cc4444",
  },
  likeZone: {
    backgroundColor: "#e5ffe9",
    borderColor: "#44aa66",
  },
  zoneTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    position: "absolute",
    top: 420,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },
});