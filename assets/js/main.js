const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10;
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <section class="info">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span> 
            </section>
            <div class="detail">
                <ul>
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    <li class="ability">${pokemon.ability}</li>
                    <li class="weight">${pokemon.weight}</li>
                    <li class="height">${pokemon.height}</li>
                </ul>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}" class="img">
            </div>
            </li>`
}

function loadPokemon(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const PokemonItem = pokemons.map(convertPokemonToLi).join('')
         pokemonList.innerHTML += PokemonItem               
 })
}
    //carrega mais pokemons
loadPokemon(offset, limit)
    loadMoreButton.addEventListener('click', () => {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemon(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemon(offset, limit)
        }
})
