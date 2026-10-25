import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { capitalize, formatNumber } from '../utils/format';

// Tarjeta de la cuadricula: imagen, numero y nombre
export default function PokemonCard({ pokemon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* imagen remota: si no le ponemos width y height no se ve */}
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  image: {
    width: 96,
    height: 96,
  },
  number: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});