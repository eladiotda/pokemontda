import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ListScreen from "./src/screens/ListScreen";

export default function App() {
  return (
    // SafeAreaView para que nada quede debajo de la camara o el reloj
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.title}>PokéDex Explorer</Text>
        </View>

        <View style={styles.body}>
          {/* muestra en consola */}
          <ListScreen
            onSelect={(id) => console.log("Tocaron el pokemon", id)}
          />
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
