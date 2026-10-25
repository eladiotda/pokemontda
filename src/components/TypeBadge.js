import { StyleSheet, Text, View } from 'react-native';
import { getTypeColor } from '../utils/typeColors';
import { typeName } from '../utils/format';

// Etiqueta de un tipo con su color (fuego, agua, planta...)
export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
      <Text style={styles.text}>{typeName(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});