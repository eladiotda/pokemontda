// Limpia lo que escribe el usuario antes de buscar:
// "  PIKACHU " -> "pikachu"   |   "#025" -> "25"   |   "mr mime" -> "mr-mime"
export function cleanSearch(text) {
  let query = text.trim().toLowerCase(); // la api solo acepta minusculas
  query = query.replace("#", "");
  query = query.replace(/\s+/g, "-"); // la api usa guiones en vez de espacios

  // si es un numero le quitamos los ceros de adelante ("025" -> "25")
  if (/^\d+$/.test(query)) {
    query = String(Number(query));
  }

  return query;
}

// Busqueda parcial sobre la lista completa:
// "char" -> charmander, charmeleon, charizard...
// "25"   -> #25, #250, #251...
export function filterPokemons(pokemons, query) {
  // si es numero buscamos por el numero, si no por el nombre
  if (/^\d+$/.test(query)) {
    return pokemons.filter((p) => String(p.id).startsWith(query));
  }
  return pokemons.filter((p) => p.name.includes(query));
}
