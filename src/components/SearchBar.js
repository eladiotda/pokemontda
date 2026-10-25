import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

// Barra de busqueda: filtra mientras el usuario escribe
export default function SearchBar({ onSearch }) {
  // useState para guardar lo que va escribiendo el usuario
  const [text, setText] = useState("");

  // con cada letra buscamos de una vez (busqueda parcial)
  function handleChange(newText) {
    setText(newText);
    onSearch(newText);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Busca por nombre o número..."
        value={text}
        onChangeText={handleChange}
        autoCapitalize="none" // para que no ponga mayuscula al inicio
        autoCorrect={false} // para que no cambie el nombre del pokemon
        returnKeyType="search"
      />
      {/* el boton solo aparece si hay algo escrito, y vuelve a la lista normal */}
      {text !== "" && (
        <Button title="Limpiar" color="#D7263D" onPress={() => handleChange("")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
});
