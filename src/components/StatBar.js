import { StyleSheet, Text, View } from 'react-native';
import { statName } from '../utils/format';

// el valor maximo que puede tener una estadistica
const MAX_STAT = 255;

// Una estadistica: nombre, valor y una barra del tamaño proporcional
export default function StatBar({ name, value }) {
  // regla de 3: si 255 es el 100%, cuanto es value
  const percent = (value / MAX_STAT) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{statName(name)}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: percent + '%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    width: 80,
    color: '#666',
  },
  value: {
    width: 35,
    fontWeight: 'bold',
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  barFill: {
    height: 10,
    backgroundColor: '#D7263D',
    borderRadius: 5,
  },
});