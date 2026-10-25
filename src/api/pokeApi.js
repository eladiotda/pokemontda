// En este archivo van TODAS las llamadas a la PokeAPI.
// Asi las pantallas no tienen fetch mezclado con el JSX (regla del taller).

const BASE_URL = 'https://pokeapi.co/api/v2';

// url de la imagen oficial, solo necesita el id
function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Trae 20 pokemon empezando desde "offset"
// async/await: esperamos la respuesta antes de seguir
export async function getPokemonList(offset) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=20&offset=${offset}`);

  // si la respuesta no es buena lanzamos un error
  if (!response.ok) {
    throw new Error('No se pudo cargar la lista de Pokémon.');
  }

  const data = await response.json();

  // la lista solo trae name y url, el id toca sacarlo del final de la url
  // ejemplo: "https://pokeapi.co/api/v2/pokemon/25/" -> 25
  const pokemons = data.results.map((item) => {
    const parts = item.url.split('/');
    const id = Number(parts[parts.length - 2]); // el ultimo es "" por el "/" final

    return {
      id: id,
      name: item.name,
      image: getImageUrl(id),
    };
  });

  return pokemons;
}

// Trae la ficha de un pokemon por nombre o por numero
export async function getPokemon(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  // OJO: si el pokemon no existe la API responde 404 con texto, no con JSON.
  // por eso revisamos esto ANTES de llamar response.json()
  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (!response.ok) {
    throw new Error('Error en el servidor.');
  }

  const data = await response.json();

  // devolvemos solo lo que usa la app
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || getImageUrl(data.id),
    types: data.types.map((t) => t.type.name),
    height: data.height / 10, // viene en decimetros -> metros
    weight: data.weight / 10, // viene en hectogramos -> kilos
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
}