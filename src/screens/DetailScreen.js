import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyMessage from "../components/EmptyMessage";
import usePokemonDetail from "../hooks/usePokemonDetail";
import { capitalize, formatNumber } from "../utils/format";

// Pantalla de la ficha de un pokemon
export default function DetailScreen({ nameOrId, onBack }) {
  const { pokemon, loading, error, notFound, retry } =
    usePokemonDetail(nameOrId);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Loading text="Cargando ficha..." />
      </View>
    );
  }

  if (notFound) {
    return (
      <View style={styles.screen}>
        <EmptyMessage
          message={`No encontramos "${nameOrId}". Revisa el nombre o el número.`}
        />
        <View style={styles.bottomButton}>
          <Button title="Volver a la lista" color="#D7263D" onPress={onBack} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
        <View style={styles.bottomButton}>
          <Button title="Volver a la lista" color="#D7263D" onPress={onBack} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* aqui si usamos ScrollView porque es una sola ficha, no una lista larga */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
          <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

          {/* un badge por cada tipo */}
          <View style={styles.types}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
        </View>

        <View style={styles.measures}>
          <View style={styles.measureBox}>
            <Text style={styles.measureValue}>{pokemon.height} m</Text>
            <Text style={styles.measureLabel}>Altura</Text>
          </View>
          <View style={styles.measureBox}>
            <Text style={styles.measureValue}>{pokemon.weight} kg</Text>
            <Text style={styles.measureLabel}>Peso</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </View>

        <Button title="Volver a la lista" color="#D7263D" onPress={onBack} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2", // fondo solido para tapar la lista de atras
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  number: {
    textAlign: "center",
    color: "#888",
    fontWeight: "bold",
  },
  name: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  measures: {
    flexDirection: "row",
    marginBottom: 12,
  },
  measureBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 4,
    alignItems: "center",
  },
  measureValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  measureLabel: {
    color: "#666",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bottomButton: {
    padding: 20,
  },
});
