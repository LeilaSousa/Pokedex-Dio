const pokeApi = {}

function convertPokeApiToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.home.front_default
    pokemon.weight = pokeDetail.weight/10 +' kg'
    pokemon.height = pokeDetail.height /10 +' m'
        const abilities =  pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
        const [ability] = abilities

    pokemon.ability = ability

    return pokemon
    }

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}




