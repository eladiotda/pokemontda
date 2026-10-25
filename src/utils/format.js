// Funciones pequeñas para mostrar los datos bonitos en pantalla

// 25 -> "#025"
// padStart rellena con ceros a la izquierda hasta tener 3 digitos
export function formatNumber(id) {
  return '#' + String(id).padStart(3, '0');
}

// "pikachu" -> "Pikachu"
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// nombres de los tipos en español (la API los manda en ingles)
const typeNames = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

export function typeName(type) {
  // si no esta en la lista dejamos el nombre como viene
  return typeNames[type] || type;
}

// nombres de las estadisticas en español
const statNames = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

export function statName(stat) {
  return statNames[stat] || stat;
}