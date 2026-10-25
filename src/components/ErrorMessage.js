import { Button, StyleSheet, Text, View } from 'react-native';

// Estado "error": mensaje en español + boton para volver a intentar
export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Reintentar" color="#D7263D" onPress={onRetry} />
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
    marginBottom: 12,
    color: '#444',
  },
});