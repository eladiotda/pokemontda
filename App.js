import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";

export default function App() {
  // navegacion sencilla con useState (sin Expo Router):
  // null = estamos en la lista, si tiene algo = mostramos la ficha de ese pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.title}>PokéDex Explorer</Text>
        </View>

        <View style={styles.body}>
          {/* la lista no se quita, asi al volver sigue donde estabamos */}
          <ListScreen onSelect={setSelectedPokemon} />

          {/* la ficha se pone encima de la lista */}
          {selectedPokemon !== null && (
            <View style={StyleSheet.absoluteFill}>
              <DetailScreen
                nameOrId={selectedPokemon}
                onBack={() => setSelectedPokemon(null)}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#D7263D",
  },
  header: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
