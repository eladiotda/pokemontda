import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// Estado "cargando": rueda  y texto
export default function Loading({ text }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D7263D" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    color: '#666',
  },
});