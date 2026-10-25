import { StyleSheet, Text, View } from 'react-native';

// Estado "vacio": cuando no hay nada que mostrar (ej. pokemon que no existe)
export default function EmptyMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    color: '#666',
  },
});
